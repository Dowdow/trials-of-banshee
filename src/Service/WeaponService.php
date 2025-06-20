<?php

namespace App\Service;

use App\Entity\Weapon;
use App\Exception\WeaponNotFoundFromRequestException;
use App\Repository\WeaponRepository;
use Doctrine\ORM\EntityManagerInterface;
use JsonException;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;

class WeaponService
{
  private EntityManagerInterface $em;
  private LoggerInterface $logger;

  public function __construct(EntityManagerInterface $em, LoggerInterface $logger)
  {
    $this->em = $em;
    $this->logger = $logger;
  }

  /**
   * @param Request $request
   * @return Weapon
   * @throws WeaponNotFoundFromRequestException
   */
  public function retrieveWeaponFromRequest(Request $request): Weapon
  {
    try {
      $content = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
      $this->logger->error($e);
      $content = [];
    }

    $weaponId = $content['weaponId'] ?? null;
    if ($weaponId === null) {
      throw new WeaponNotFoundFromRequestException('`weaponId` needed for the guess');
    }

    /** @var WeaponRepository $weaponRepository */
    $weaponRepository = $this->em->getRepository(Weapon::class);
    /** @var Weapon|null $weapon */
    $weapon = $weaponRepository->findOneBy(['id' => $weaponId, 'hidden' => false]);
    if ($weapon === null) {
      throw new WeaponNotFoundFromRequestException('Weapon not found');
    }

    return $weapon;
  }
}
