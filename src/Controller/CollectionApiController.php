<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class CollectionApiController extends AbstractController
{
  #[Route('/collections', name: 'api.collections', methods: ['GET'])]
  public function triumphs(): JsonResponse
  {
    if (!$this->isGranted(User::ROLE_USER)) {
      return new JsonResponse([]);
    }
    /** @var User $user */
    $user = $this->getUser();
    return new JsonResponse($user->getCollections());
  }
}
