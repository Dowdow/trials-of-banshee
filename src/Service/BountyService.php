<?php

namespace App\Service;

use App\Entity\Bounty;
use App\Entity\Weapon;
use App\Repository\BountyRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Psr\Log\LoggerInterface;

class BountyService
{
  private EntityManagerInterface $em;
  private LoggerInterface $logger;

  public function __construct(
    EntityManagerInterface $em,
    LoggerInterface $logger
  )
  {
    $this->em = $em;
    $this->logger = $logger;
  }

  public function getTodayBountyDate(): DateTime
  {
    $currentDateTime = new DateTime();
    $todayBountyDate = clone $currentDateTime;
    $todayBountyDate->setTime(17, 0);

    if ($currentDateTime < $todayBountyDate) {
      $todayBountyDate->modify('-1 day');
    }

    return $todayBountyDate;
  }

  /**
   * @return Bounty[]
   */
  public function getBountiesByDate(DateTime $date): array
  {
    /** @var BountyRepository $bountyRepository */
    $bountyRepository = $this->em->getRepository(Bounty::class);
    return $bountyRepository->findBy(['dateStart' => $date]);
  }

  /**
   * @param Bounty[] $bounties
   * @param DateTime $date
   * @return int
   */
  public function getTotalBountyCompletionsByDate(array $bounties, DateTime $date): int
  {
    $totalCompletions = 0;
    foreach ($bounties as $bounty) {
      $totalCompletions += $bounty->getOfflineCompletions();
    }

    try {
      /** @var BountyRepository $bountyRepository */
      $bountyRepository = $this->em->getRepository(Bounty::class);
      $totalCompletions += $bountyRepository->countBountyCompletionByDate($date);
    } catch (NoResultException|NonUniqueResultException $e) {
      $this->logger->error($e);
    }

    return $totalCompletions;
  }

  public function isWeaponCorrect(Bounty $bounty, Weapon $weapon): bool
  {
    $bountySounds = $bounty->getWeapon()?->getSounds() ?? [];
    foreach ($bountySounds as $sound) {
      if ($weapon->hasSound($sound)) {
        return true;
      }
    }
    return false;
  }

  public function isWeaponPerfectMatch(Bounty $bounty, Weapon $weapon): bool
  {
    $bountyWeapon = $bounty->getWeapon();
    return $bountyWeapon && $bountyWeapon->getId() === $weapon->getId();
  }
}
