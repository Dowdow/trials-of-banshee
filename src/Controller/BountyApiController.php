<?php

namespace App\Controller;

use App\Entity\Bounty;
use App\Entity\BountyCompletion;
use App\Entity\User;
use App\Exception\ClueNotFoundFromRequestException;
use App\Exception\WeaponNotFoundFromRequestException;
use App\Formatter\BountyFormatter;
use App\Repository\BountyRepository;
use App\Service\BountyService;
use App\Service\CollectionService;
use App\Service\TriumphService;
use App\Service\WeaponService;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class BountyApiController extends AbstractController
{
  /**
   * @param ManagerRegistry $managerRegistry
   * @param BountyFormatter $bountyFormatter
   * @return JsonResponse
   */
  #[Route('/bounties/today', name: 'api.bounties.today', methods: ['GET'])]
  public function bountiesToday(ManagerRegistry $managerRegistry, BountyFormatter $bountyFormatter): JsonResponse
  {
    $em = $managerRegistry->getManager();
    /** @var BountyRepository $bountyRepository */
    $bountyRepository = $em->getRepository(Bounty::class);

    $currentDateTime = new DateTime();
    $todayBountyDate = clone $currentDateTime;
    $todayBountyDate->setTime(17, 0);

    if ($currentDateTime < $todayBountyDate) {
      $todayBountyDate->modify('-1 day');
    }

    $bounties = $bountyRepository->findBy(['dateStart' => $todayBountyDate]);

    if (!$this->isGranted(User::ROLE_USER)) {
      return new JsonResponse($bountyFormatter->formatBountiesNotAuthenticated($bounties));
    }

    /** @var User $user */
    $user = $this->getUser();
    return new JsonResponse($bountyFormatter->formatBounties($user, $bounties));
  }

  /**
   * @param Bounty|null $bounty
   * @param Request $request
   * @param ManagerRegistry $managerRegistry
   * @param BountyService $bountyService
   * @param CollectionService $collectionService
   * @param TriumphService $triumphService
   * @param WeaponService $weaponService
   * @param BountyFormatter $bountyFormatter
   * @return JsonResponse
   */
  #[Route('/bounty/{id}/guess', name: 'api.bounty.guess', methods: ['POST'])]
  public function bountyGuess(
    ?Bounty           $bounty,
    Request           $request,
    ManagerRegistry   $managerRegistry,
    BountyService     $bountyService,
    CollectionService $collectionService,
    TriumphService    $triumphService,
    WeaponService     $weaponService,
    BountyFormatter   $bountyFormatter
  ): JsonResponse
  {
    if ($bounty === null) {
      return new JsonResponse(['errors' => ['Bounty not found']], 404);
    }

    $isConnected = $this->isGranted(User::ROLE_USER);

    // Check if User is connected to play aspiring and gunsmith bounties
    $bountyType = $bounty->getType();
    if (!$isConnected && in_array($bountyType, [Bounty::TYPE_ASPIRING, Bounty::TYPE_GUNSMITH], true)) {
      return new JsonResponse(['errors' => ['You need to be authenticated to do this Bounty']], 403);
    }

    // Check if the User play the Bounty when it's available (can play older bounties)
    $date = new DateTime();
    if ($date < $bounty->getDateStart()) {
      return new JsonResponse(['errors' => ['Bounty not available yet. Be patient Guardian']], 400);
    }

    // Retrieve the guessed Weapon
    try {
      $weapon = $weaponService->retrieveWeaponFromRequest($request);
    } catch (WeaponNotFoundFromRequestException $e) {
      return new JsonResponse(['errors' => [$e->getMessage()]], 400);
    }

    // Check if the Weapon is a correct answer
    $isWeaponCorrect = $bountyService->isWeaponCorrect($bounty, $weapon);
    $isPerfectMatch = $bountyService->isWeaponPerfectMatch($bounty, $weapon);

    // BountyCompletion object creation (From database or request)
    if ($isConnected) {
      /** @var User $user */
      $user = $this->getUser();
      $bountyCompletion = $bountyService->findOrCreateBountyCompletion($bounty, $user, true);
    } else {
      $bountyCompletion = $bountyService->findOrCreateBountyCompletionWithSesion($bounty);
    }

    // Check if the Bounty is not already completed
    if ($bountyCompletion->isCompleted()) {
      return new JsonResponse(['errors' => ['Bounty already completed']], 400);
    }

    $bountyCompletion
      ->addAttempt()
      ->addHistory($weapon->getId())
      ->setCompleted($isWeaponCorrect)
      ->setPerfectMatch($isPerfectMatch);

    // Early return for session player
    if (!$isConnected) {
      $bountyService->saveBountyCompletionWithSession($bounty, $bountyCompletion);
      return new JsonResponse($bountyFormatter->formatBounty($bounty, $bountyCompletion));
    }

    // Manager collection and triumphs when the bounty is correct
    if ($isWeaponCorrect) {
      $triumphService->addBountyCompletion($user);
      if ($isPerfectMatch) {
        $triumphService->addPerfectMatchCompletion($user);
      }
      if ($bountyType === Bounty::TYPE_ASPIRING) {
        $succeeded = $bountyCompletion->getAttempts() < 4;
        $bountyCompletion->setSucceeded($succeeded);
        if ($succeeded) {
          $triumphService->addAspiringBountyCompletion($user);
          $loot = $collectionService->rewardAspiringBountyCompletionEngram($user);
        }
      } elseif ($bountyType === Bounty::TYPE_GUNSMITH) {
        $succeeded = $bountyCompletion->getAttempts() < 2;
        $bountyCompletion->setSucceeded($succeeded);
        if ($succeeded) {
          $triumphService->addTrueGunsmithBountyCompletion($user);
          $loot = $collectionService->rewardGunsmithBountyCompletionEngram($user);
        }
      }
      if ($bountyType === Bounty::TYPE_DAILY || (isset($succeeded) && !$succeeded)) {
        $loot = $collectionService->rewardDailyBountyCompletionEngram($user);
      }
    }

    $em = $managerRegistry->getManager();
    $em->flush();

    return new JsonResponse($bountyFormatter->formatBounty($bounty, $bountyCompletion, $loot ?? null));
  }

  /**
   * @param Bounty|null $bounty
   * @param Request $request
   * @param ManagerRegistry $managerRegistry
   * @param BountyService $bountyService
   * @param BountyFormatter $bountyFormatter
   * @return JsonResponse
   */
  #[Route('/bounty/{id}/clue')]
  public function bountyClue(
    ?Bounty         $bounty,
    Request         $request,
    ManagerRegistry $managerRegistry,
    BountyService   $bountyService,
    BountyFormatter $bountyFormatter
  ): JsonResponse
  {
    if ($bounty === null) {
      return new JsonResponse(['errors' => ['Bounty not found']], 404);
    }

    $isConnected = $this->isGranted(User::ROLE_USER);

    // Check if User is connected to play aspiring and gunsmith bounties
    if (!$isConnected && in_array($bounty->getType(), [Bounty::TYPE_ASPIRING, Bounty::TYPE_GUNSMITH], true)) {
      return new JsonResponse(['errors' => ['You need to be authenticated to do this Bounty']], 403);
    }

    // Check if the User play the Bounty when it's available (can play older bounties)
    $date = new DateTime();
    if ($date < $bounty->getDateStart()) {
      return new JsonResponse(['errors' => ['Bounty not available yet. Be patient Guardian']], 400);
    }

    // Retrieve the asked clue type
    try {
      $clueType = $bountyService->retrieveClueTypeFromRequest($request);
    } catch (ClueNotFoundFromRequestException $e) {
      return new JsonResponse(['errors' => [$e->getMessage()]], 400);
    }

    // BountyCompletion object creation (From database or request)
    if ($isConnected) {
      /** @var User $user */
      $user = $this->getUser();
      $bountyCompletion = $bountyService->findOrCreateBountyCompletion($bounty, $user, true);
    } else {
      $bountyCompletion = $bountyService->findOrCreateBountyCompletionWithSesion($bounty);
    }

    // Check if the Bounty is not already completed
    if ($bountyCompletion->isCompleted()) {
      return new JsonResponse(['errors' => ['Bounty already completed']], 400);
    }

    // Check if the clue is authorized at this time
    if (!$bountyService->isClueValid($bountyCompletion, $clueType)) {
      return new JsonResponse(['errors' => ['You can\'t ask for this clue now']], 400);
    }

    // Add the clue to the BountyCompletion
    $weapon = $bounty->getWeapon();
    if ($clueType === BountyCompletion::CLUE_RARITY) {
      $bountyCompletion->addClue($clueType, $weapon?->getRarity());
    } elseif ($clueType === BountyCompletion::CLUE_DAMAGE_TYPE) {
      $bountyCompletion->addClue($clueType, $weapon?->getDamageType());
    } elseif ($clueType === BountyCompletion::CLUE_WEAPON_TYPE) {
      $bountyCompletion->addClue($clueType, $weapon?->getType());
    }

    // Early return for session player
    if (!$isConnected) {
      $bountyService->saveBountyCompletionWithSession($bounty, $bountyCompletion);
      return new JsonResponse($bountyFormatter->formatBounty($bounty, $bountyCompletion));
    }

    $em = $managerRegistry->getManager();
    $em->flush();

    return new JsonResponse($bountyFormatter->formatBounty($bounty, $bountyCompletion));
  }
}
