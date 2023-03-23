<?php

namespace App\Repository;

use DateTime;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;

class BountyRepository extends EntityRepository
{
  /**
   * @param DateTime $dateStart
   * @param int $type
   * @return bool
   * @throws NoResultException
   * @throws NonUniqueResultException
   */
  public function hasBountyWithDateStartAndType(DateTime $dateStart, int $type): bool
  {
    $qb = $this->createQueryBuilder('b');
    $qb
      ->select('COUNT(b.id)')
      ->where($qb->expr()->eq('b.type', ':type'))
      ->andWhere($qb->expr()->eq('b.dateStart', ':dateStart'))
      ->setParameter('type', $type)
      ->setParameter('dateStart', $dateStart);

    return $qb->getQuery()->getSingleScalarResult() > 0;
  }
}
