<?php

namespace App\Controller;

use App\Entity\Weapon;
use App\Formatter\WeaponFormatter;
use App\Repository\WeaponRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class WeaponApiController extends AbstractController
{
  #[Route('/weapons', name: 'api.weapons', methods: ['GET'])]
  public function weapons(ManagerRegistry $managerRegistry, WeaponFormatter $weaponFormatter): JsonResponse
  {
    $em = $managerRegistry->getManager();
    /** @var WeaponRepository $weaponRepository */
    $weaponRepository = $em->getRepository(Weapon::class);

    $weapons = $weaponRepository->findBy(['hidden' => false]);

    return new JsonResponse($weaponFormatter->formatWeapons($weapons));
  }
}
