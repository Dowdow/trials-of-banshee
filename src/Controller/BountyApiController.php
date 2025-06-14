<?php

namespace App\Controller;

use App\Entity\Bounty;
use App\Entity\User;
use App\Exception\WeaponNotFoundFromRequestException;
use App\Formatter\BountyFormatter;
use App\Service\BountyCompletionService;
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
  #[Route('/bounties/today', name: 'api.bounties.today', methods: ['GET'])]
  public function bountiesToday(BountyService $bountyService, BountyFormatter $bountyFormatter): JsonResponse
  {
    $bountyDate = $bountyService->getTodayBountyDate();
    $bounties = $bountyService->getBountiesByDate($bountyDate);
    $totalCompletions = $bountyService->getTotalBountyCompletionsByDate($bounties, $bountyDate);

    if (!$this->isGranted(User::ROLE_USER)) {
      return new JsonResponse($bountyFormatter->formatBountiesNotAuthenticated($bounties, $totalCompletions));
    }

    /** @var User $user */
    $user = $this->getUser();
    return new JsonResponse($bountyFormatter->formatBounties($user, $bounties, $totalCompletions));
  }

  #[Route('/bounty/{id}/guess', name: 'api.bounty.guess', methods: ['POST'])]
  public function bountyGuess(
    ?Bounty $bounty,
    Request $request,
    ManagerRegistry $managerRegistry,
    BountyService $bountyService,
    BountyCompletionService $bountyCompletionService,
    CollectionService $collectionService,
    TriumphService $triumphService,
    WeaponService $weaponService,
    BountyFormatter $bountyFormatter
  ): JsonResponse
  {
    if ($bounty === null) {
      return new JsonResponse(['errors' => ['Bounty not found']], 404);
    }

    // Check if the User plays the Bounty when it's available (can play older bounties)
    $date = new DateTime();
    if ($date < $bounty->getDateStart()) {
      return new JsonResponse(['errors' => ['Bounty not available yet. Be patient Guardian']], 400);
    }

    $isConnected = $this->isGranted(User::ROLE_USER);

    // BountyCompletion object creation (From database or request)
    if ($isConnected) {
      /** @var User $user */
      $user = $this->getUser();
      $bountyCompletion = $bountyCompletionService->findOrCreateBountyCompletion($bounty, $user, true);
    } else {
      $bountyCompletion = $bountyCompletionService->findOrCreateBountyCompletionWithSesion($bounty);
    }

    // Check if the Bounty is not already completed
    if ($bountyCompletion->isCompleted()) {
      return new JsonResponse(['errors' => ['Bounty already completed']], 400);
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

    $bountyCompletion
      ->addAttempt()
      ->addHistory($weapon->getId())
      ->setCompleted($isWeaponCorrect)
      ->setPerfectMatch($isPerfectMatch);

    $isFlawless = $bountyCompletionService->isBountyCompletionFlawless($bounty, $bountyCompletion);
    $bountyCompletion->setFlawless($isFlawless);

    // Early return for session player
    if (!$isConnected) {
      $bountyCompletionService->saveBountyCompletionWithSession($bounty, $bountyCompletion);
      if ($bountyCompletion->isCompleted()) {
        $bounty->setOfflineCompletions($bounty->getOfflineCompletions() + 1);
        $em = $managerRegistry->getManager();
        $em->flush();
      }
      return new JsonResponse($bountyFormatter->formatBounty($bounty, $bountyCompletion));
    }

    // Manage collection and triumphs when the bounty is correct
    if ($isWeaponCorrect === true) {
      $triumphService->addBountyCompletion($user);
      if ($isPerfectMatch === true) {
        $triumphService->addPerfectMatchCompletion($user);
      }
      if ($isFlawless === true) {
        if ($bounty->getType() === Bounty::TYPE_ASPIRING) {
          $triumphService->addAspiringBountyCompletion($user);
          $loot = $collectionService->rewardAspiringBountyCompletionEngram($user);
        } elseif ($bounty->getType() === Bounty::TYPE_GUNSMITH) {
          $triumphService->addTrueGunsmithBountyCompletion($user);
          $loot = $collectionService->rewardGunsmithBountyCompletionEngram($user);
        }
      } else {
        $loot = $collectionService->rewardDailyBountyCompletionEngram($user);
      }
    }

    $em = $managerRegistry->getManager();
    $em->flush();

    return new JsonResponse($bountyFormatter->formatBounty($bounty, $bountyCompletion, $loot ?? null));
  }

  #[Route('/bounty/xur', name: 'api.bounty.xur', methods: ['POST'])]
  public function bountyXurClaim(
    BountyService $bountyService,
    BountyCompletionService $bountyCompletionService,
    CollectionService $collectionService,
    ManagerRegistry $managerRegistry
  ): JsonResponse
  {
    if (!$this->isGranted(User::ROLE_USER)) {
      return new JsonResponse(['errors' => ['You need to be connected to claim this reward']], 401);
    }

    /** @var User $user */
    $user = $this->getUser();
    $bountyDate = $bountyService->getTodayBountyDate();
    $bounties = $bountyService->getBountiesByDate($bountyDate);

    $claimable = true;
    foreach ($bounties as $bounty) {
      $bountyCompletion = $bountyCompletionService->findOrCreateBountyCompletion($bounty, $user);
      if (!$bountyCompletion->isCompleted() || $bountyCompletion->getAttempts() !== 1) {
        $claimable = false;
      }
    }

    if (!$claimable) {
      return new JsonResponse(['errors' => ['You cannot claim this reward']], 400);
    }

    $collectionService->rewardXurItem($user);
    $em = $managerRegistry->getManager();
    $em->flush();

    return new JsonResponse($user->getCollections());
  }
}
