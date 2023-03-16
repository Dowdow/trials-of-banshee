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

    try {
      return $qb->getQuery()->getSingleScalarResult() > 0;
    } catch (NoResultException|NonUniqueResultException $e) {
      // TODO Log Exception or throw a specific one
      return false;
    }
  }
}
