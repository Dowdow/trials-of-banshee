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

  /**
   * @param DateTime $date
   * @return int
   * @throws NoResultException
   * @throws NonUniqueResultException
   */
  public function countBountyCompletionByDate(DateTime $date): int
  {
    $qb = $this->createQueryBuilder('b');
    $qb
      ->select('COUNT(bc.id)')
      ->innerJoin('b.bountyCompletions', 'bc')
      ->where($qb->expr()->eq('b.dateStart', ':date'))
      ->groupBy('b.dateStart')
      ->setParameter('date', $date);

    return $qb->getQuery()->getSingleScalarResult();
  }
}
