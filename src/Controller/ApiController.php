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
class ApiController extends AbstractController
{
  /**
   * @param ManagerRegistry $managerRegistry
   * @param WeaponFormatter $weaponFormatter
   * @return JsonResponse
   */
  #[Route('/weapons', name: 'api.weapons', methods: ['GET'])]
  public function index(ManagerRegistry $managerRegistry, WeaponFormatter $weaponFormatter): JsonResponse
  {
    $em = $managerRegistry->getManager();
    /** @var WeaponRepository */
    $weaponRepository = $em->getRepository(Weapon::class);

    $weapons = $weaponRepository->findAll();

    return new JsonResponse($weaponFormatter->formatWeapons($weapons));
  }
}
