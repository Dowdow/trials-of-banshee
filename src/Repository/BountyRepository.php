<?php

namespace App\Repository;

use DateTime;
use Doctrine\ORM\EntityRepository;

class BountyRepository extends EntityRepository
{
  /**
   * @param DateTime $dateStart
   * @param int $type
   * @return bool
   */
  public function hasBountyWithDateStartAndType(DateTime $dateStart, int $type): bool
  {
    $qb = $this->createQueryBuilder('b');
    $qb
      ->select('COUNT(b.id)')
      ->where($qb->expr()->eq('b.type', ':type'))
      ->andWhere($qb->expr()->gte('b.dateStart', ':dateStart'))
      ->setParameter('type', $type)
      ->setParameter('dateStart', $dateStart);

    return $qb->getQuery()->getSingleScalarResult() > 0;
  }
}
