<?php

namespace App\Controller;

use App\Entity\Bounty;
use App\Entity\User;
use App\Exception\WeaponNotFoundFromRequestException;
use App\Formatter\BountyFormatter;
use App\Repository\BountyRepository;
use App\Service\BountyService;
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
  public function bountiesToday(Request $request, ManagerRegistry $managerRegistry, BountyFormatter $bountyFormatter): JsonResponse
  {
    $em = $managerRegistry->getManager();
    /** @var BountyRepository */
    $bountyRepository = $em->getRepository(Bounty::class);

    $currentDateTime = new DateTime();
    $todayBountyDate = clone $currentDateTime;
    $todayBountyDate->setTime(17, 0, 0, 0);

    if ($currentDateTime < $todayBountyDate) {
      $todayBountyDate->modify('-1 day');
    }

    $bounties = $bountyRepository->findBy(['dateStart' => $todayBountyDate]);

    // $request->getSession()->remove('bounty_9');

    if (!$this->isGranted(User::ROLE_USER)) {
      return new JsonResponse($bountyFormatter->formatBountiesNotAuthenticated($bounties));
    }

    /** @var User */
    $user = $this->getUser();
    return new JsonResponse($bountyFormatter->formatBounties($user, $bounties));
  }

  /**
   * @param Bounty $bounty
   * @param Request $request
   * @param ManagerRegistry $managerRegistry
   * @param BountyService $bountyService
   * @param WeaponService $weaponService
   * @param BountyFormatter $bountyFormatter
   * @return JsonResponse
   */
  #[Route('/bounty/{id}/guess', name: 'api.bounty.guess', methods: ['POST'])]
  public function bountyGuess(Bounty $bounty, Request $request, ManagerRegistry $managerRegistry, BountyService $bountyService, WeaponService $weaponService, BountyFormatter $bountyFormatter): JsonResponse
  {
    if ($bounty === null) {
      return new JsonResponse(['errors' => ['Bounty not found']], 404);
    }

    $isConnected = $this->isGranted(User::ROLE_USER);

    // Check if User is connected to play aspiring and gunsmith bounties
    if (!$isConnected && in_array($bounty->getType(), [Bounty::TYPE_ASPIRING, Bounty::TYPE_GUNSMITH])) {
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

    // BountyCompletion object creation (From database or request)
    if ($isConnected) {
      /** @var User */
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
      ->setCompleted($isWeaponCorrect);

    // Early return for localstorage player
    if (!$isConnected) {
      $bountyService->saveBountyCompletionWithSession($bounty, $bountyCompletion);
      return new JsonResponse($bountyFormatter->formatBounty($bounty, $bountyCompletion));
    }

    if ($bounty->getType() === Bounty::TYPE_DAILY) {
      // Pas de check à faire
      // Ajout du loot en conséquence
    } elseif ($bounty->getType() === Bounty::TYPE_ASPIRING) {
      if ($isWeaponCorrect) {
        $bountyCompletion->setSucceeded($bountyCompletion->getAttempts() < 4);
      }
      // Ajout du loot en conséquence
    } elseif ($bounty->getType() === Bounty::TYPE_GUNSMITH) {
      if ($isWeaponCorrect) {
        $bountyCompletion->setSucceeded($bountyCompletion->getAttempts() < 2);
      }
      // Ajout du loot en conséquence
    }

    $em = $managerRegistry->getManager();
    $em->flush();

    return new JsonResponse($bountyFormatter->formatBounty($bounty, $bountyCompletion));
  }
}
