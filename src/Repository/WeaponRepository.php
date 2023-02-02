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
    $qb2 = $this->createQueryBuilder('w2');
    $qb2
      ->select('COUNT(b2) AS bounty_number')
      ->innerJoin('w2.sounds', 's2')
      ->leftJoin('w2.bounties', 'b2')
      ->where($qb2->expr()->eq('w2.hidden', ':hidden'))
      ->groupBy('w2')
      ->orderBy('bounty_number', 'ASC')
      ->setMaxResults(1)
      ->setParameter('hidden', false);

    $minBounties = $qb2->getQuery()->getSingleScalarResult();

    $qb = $this->createQueryBuilder('w');
    $qb
      ->select('w, COUNT(b) AS HIDDEN bounties')
      ->innerJoin('w.sounds', 's')
      ->leftJoin('w.bounties', 'b')
      ->where($qb2->expr()->eq('w.hidden', ':hidden'))
      ->groupBy('w')
      ->having($qb->expr()->lte('bounties', ':minBounties'))
      ->setParameter('hidden', false)
      ->setParameter('minBounties', $minBounties);

    return $qb->getQuery()->getResult();
  }
}
