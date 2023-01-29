<?php

namespace App\Repository;

use Doctrine\ORM\EntityRepository;

class WeaponRepository extends EntityRepository
{
  /**
   * @return array
   */
  public function findWeaponsWithSoundAndMinBounties(): array
  {
    $qb = $this->createQueryBuilder('w');
    $qb
      ->select('w, COUNT(b.id) AS bounties')
      ->innerJoin('w.sounds', 's')
      ->leftJoin('w.bounties', 'b')
      ->groupBy('w.id')
      ->having($qb->expr()->lte('bounties', 'MIN(bounties)'));

    return $qb->getQuery()->getResult();
  }
}
