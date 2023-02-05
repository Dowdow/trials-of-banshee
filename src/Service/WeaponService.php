<?php

namespace App\Service;

use App\Entity\Weapon;
use App\Exception\WeaponNotFoundFromRequestException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class WeaponService
{
  private EntityManagerInterface $em;

  /**
   * WeaponService constructor.
   * @param EntityManagerInterface $em
   */
  public function __construct(EntityManagerInterface $em)
  {
    $this->em = $em;
  }

  /**
   * @param Request $request
   * @return Weapon
   */
  public function retrieveWeaponFromRequest(Request $request): Weapon
  {
    $content = json_decode($request->getContent(), true);
    $weaponId = $content['weaponId'] ?? null;
    if ($weaponId === null) {
      throw new WeaponNotFoundFromRequestException('`weaponId` needed for the guess');
    }

    /** @var WeaponRepository */
    $weaponRepository = $this->em->getRepository(Weapon::class);
    /** @var Weapon|null */
    $weapon = $weaponRepository->findOneBy(['id' => $weaponId, 'hidden' => false]);
    if ($weapon === null) {
      throw new WeaponNotFoundFromRequestException('Weapon not found');
    }

    return $weapon;
  }
}
