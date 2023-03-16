<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\TriumphService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class TriumphApiController extends AbstractController
{
  #[Route('/triumphs', name: 'api.triumphs', methods: ['GET'])]
  public function triumphs(): JsonResponse
  {
    if (!$this->isGranted(User::ROLE_USER)) {
      return new JsonResponse([]);
    }
    /** @var User $user */
    $user = $this->getUser();
    return new JsonResponse($user->getTriumphs());
  }

  #[Route('/triumph/{type}/claim', name: 'api.triumphs.claim', methods: ['POST'])]
  public function claim(string $type, ManagerRegistry $managerRegistry, TriumphService $triumphService): JsonResponse
  {
    if (!$this->isGranted(User::ROLE_USER)) {
      return new JsonResponse(['errors' => ['You need to be connected to claim a triumph']], 401);
    }

    /** @var User $user */
    $user = $this->getUser();

    switch ($type) {
      case TriumphService::BOUNTIES:
        $triumphService->setBountiesClaimed($user, true);
        break;
      case TriumphService::ASPIRING_BOUNTIES:
        $triumphService->setAspiringBountiesClaimed($user, true);
        break;
      case TriumphService::TRUE_GUNSMITH_BOUNTIES:
        $triumphService->setTrueGunsmithBountiesClaimed($user, true);
        break;
      case TriumphService::PERFECT_MATCHES:
        $triumphService->setPerfectMatchesClaimed($user, true);
        break;
      case TriumphService::COLLECTION_BADGE:
        $triumphService->setCollectionBadge($user, true);
        break;
      case TriumphService::XUR_BOUNTY:
        $triumphService->setXurBounty($user, true);
        break;
      case TriumphService::GUNSMITH_TITLE:
        $triumphService->setGunsmithTitle($user, true);
        break;
    }

    $em = $managerRegistry->getManager();
    $em->flush();

    return new JsonResponse($user->getTriumphs());
  }
}
