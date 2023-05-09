<?php

namespace App\Service;

use App\Entity\User;

class TriumphService
{
  public const BOUNTIES = 'bounties'; // Total completed bounties
  public const BOUNTIES_DEFAULT = 0;
  public const BOUNTIES_GOAL = 100;
  public const BOUNTIES_CLAIMED = 'bountiesClaimed';
  public const BOUNTIES_CLAIMED_DEFAULT = false;
  public const ASPIRING_BOUNTIES = 'aspiringBounties'; // Total completed aspiring bounties
  public const ASPIRING_BOUNTIES_DEFAULT = 0;
  public const ASPIRING_BOUNTIES_GOAL = 30;
  public const ASPIRING_BOUNTIES_CLAIMED = 'aspiringBountiesClaimed';
  public const ASPIRING_BOUNTIES_CLAIMED_DEFAULT = false;
  public const TRUE_GUNSMITH_BOUNTIES = 'trueGunsmithBounties'; // Total completed true gunsmith bounties
  public const TRUE_GUNSMITH_BOUNTIES_DEFAULT = 0;
  public const TRUE_GUNSMITH_BOUNTIES_GOAL = 15;
  public const TRUE_GUNSMITH_BOUNTIES_CLAIMED = 'trueGunsmithBountiesClaimed';
  public const TRUE_GUNSMITH_BOUNTIES_CLAIMED_DEFAULT = false;
  public const PERFECT_MATCHES = 'perfectMatches'; // Total perfect match bounties
  public const PERFECT_MATCHES_DEFAULT = 0;
  public const PERFECT_MATCHES_GOAL = 75;
  public const PERFECT_MATCHES_CLAIMED = 'perfectMatchesClaimed';
  public const PERFECT_MATCHES_CLAIMED_DEFAULT = false;
  public const COLLECTION_BADGE = 'collectionBadge'; // Collection badge
  public const COLLECTION_BADGE_DEFAULT = false;
  public const XUR_BOUNTY = 'xurBounty'; // Xur secret bounty
  public const XUR_BOUNTY_DEFAULT = false;
  public const GUNSMITH_TITLE = 'gunsmithTitle';
  public const GUNSMITH_TITLE_DEFAULT = false;

  private CollectionService $collectionService;

  public function __construct(CollectionService $collectionService)
  {
    $this->collectionService = $collectionService;
  }

  public function addBountyCompletion(User $user): void
  {
    $triumphs = $user->getTriumphs();
    if (!array_key_exists(self::BOUNTIES, $triumphs)) {
      $triumphs[self::BOUNTIES] = self::BOUNTIES_DEFAULT;
    }
    ++$triumphs[self::BOUNTIES];
    $user->setTriumphs($triumphs);
  }

  public function setBountiesClaimed(User $user, bool $value = false): void
  {
    $triumphs = $user->getTriumphs();
    $triumphs[self::BOUNTIES_CLAIMED] = $this->isBountiesClaimable($user) ? $value : self::BOUNTIES_CLAIMED_DEFAULT;
    $user->setTriumphs($triumphs);
  }

  public function isBountiesClaimable(User $user): bool
  {
    $triumphs = $user->getTriumphs();
    return array_key_exists(self::BOUNTIES, $triumphs) && $triumphs[self::BOUNTIES] >= self::BOUNTIES_GOAL;
  }

  public function addAspiringBountyCompletion(User $user): void
  {
    $triumphs = $user->getTriumphs();
    if (!array_key_exists(self::ASPIRING_BOUNTIES, $triumphs)) {
      $triumphs[self::ASPIRING_BOUNTIES] = self::ASPIRING_BOUNTIES_DEFAULT;
    }
    ++$triumphs[self::ASPIRING_BOUNTIES];
    $user->setTriumphs($triumphs);
  }

  public function setAspiringBountiesClaimed(User $user, bool $value = false): void
  {
    $triumphs = $user->getTriumphs();
    $triumphs[self::ASPIRING_BOUNTIES_CLAIMED] = $this->isAspiringBountiesClaimable($user) ? $value : self::ASPIRING_BOUNTIES_CLAIMED_DEFAULT;
    $user->setTriumphs($triumphs);
  }

  public function isAspiringBountiesClaimable(User $user): bool
  {
    $triumphs = $user->getTriumphs();
    return array_key_exists(self::ASPIRING_BOUNTIES, $triumphs) && $triumphs[self::ASPIRING_BOUNTIES] >= self::ASPIRING_BOUNTIES_GOAL;
  }

  public function addTrueGunsmithBountyCompletion(User $user): void
  {
    $triumphs = $user->getTriumphs();
    if (!array_key_exists(self::TRUE_GUNSMITH_BOUNTIES, $triumphs)) {
      $triumphs[self::TRUE_GUNSMITH_BOUNTIES] = self::TRUE_GUNSMITH_BOUNTIES_DEFAULT;
    }
    ++$triumphs[self::TRUE_GUNSMITH_BOUNTIES];
    $user->setTriumphs($triumphs);
  }

  public function setTrueGunsmithBountiesClaimed(User $user, bool $value = false): void
  {
    $triumphs = $user->getTriumphs();
    $triumphs[self::TRUE_GUNSMITH_BOUNTIES_CLAIMED] = $this->isTrueGunsmithBountiesClaimable($user) ? $value : self::TRUE_GUNSMITH_BOUNTIES_CLAIMED_DEFAULT;
    $user->setTriumphs($triumphs);
  }

  public function isTrueGunsmithBountiesClaimable(User $user): bool
  {
    $triumphs = $user->getTriumphs();
    return array_key_exists(self::TRUE_GUNSMITH_BOUNTIES, $triumphs) && $triumphs[self::TRUE_GUNSMITH_BOUNTIES] >= self::TRUE_GUNSMITH_BOUNTIES_GOAL;
  }

  public function addPerfectMatchCompletion(User $user): void
  {
    $triumphs = $user->getTriumphs();
    if (!array_key_exists(self::PERFECT_MATCHES, $triumphs)) {
      $triumphs[self::PERFECT_MATCHES] = self::PERFECT_MATCHES_DEFAULT;
    }
    ++$triumphs[self::PERFECT_MATCHES];
    $user->setTriumphs($triumphs);
  }

  public function setPerfectMatchesClaimed(User $user, bool $value = false): void
  {
    $triumphs = $user->getTriumphs();
    $triumphs[self::PERFECT_MATCHES_CLAIMED] = $this->isPerfectMatchesClaimable($user) ? $value : self::PERFECT_MATCHES_CLAIMED_DEFAULT;
    $user->setTriumphs($triumphs);
  }

  public function isPerfectMatchesClaimable(User $user): bool
  {
    $triumphs = $user->getTriumphs();
    return array_key_exists(self::PERFECT_MATCHES, $triumphs) && $triumphs[self::PERFECT_MATCHES] >= self::PERFECT_MATCHES_GOAL;
  }

  public function setCollectionBadge(User $user, bool $value = self::COLLECTION_BADGE_DEFAULT): void
  {
    $triumphs = $user->getTriumphs();
    $triumphs[self::COLLECTION_BADGE] = $this->isCollectionBadgeClaimable($user) ? $value : false;
    $user->setTriumphs($triumphs);
  }

  public function isCollectionBadgeClaimable(User $user): bool
  {
    $hasAllEngrams = $this->collectionService->hasAllEngrams($user);
    $hasAllItems = $this->collectionService->hasAllItems($user);
    return $hasAllEngrams && $hasAllItems;
  }

  public function setXurBounty(User $user, bool $value = self::XUR_BOUNTY_DEFAULT): void
  {
    $triumphs = $user->getTriumphs();
    $triumphs[self::XUR_BOUNTY] = $this->isXurBountyClaimable($user) ? $value : false;
    $user->setTriumphs($triumphs);
  }

  public function isXurBountyClaimable(User $user): bool
  {
    return $this->collectionService->hasAllItems($user);
  }

  public function setGunsmithTitle(User $user, bool $value = self::GUNSMITH_TITLE_DEFAULT): void
  {
    $triumphs = $user->getTriumphs();
    $triumphs[self::GUNSMITH_TITLE] = $this->isGunsmithTitleClaimable($user) ? $value : false;
    $user->setTriumphs($triumphs);
  }

  public function isGunsmithTitleClaimable(User $user): bool
  {
    $triumphs = $user->getTriumphs();
    return
      isset(
        $triumphs[self::BOUNTIES_CLAIMED],
        $triumphs[self::ASPIRING_BOUNTIES_CLAIMED],
        $triumphs[self::TRUE_GUNSMITH_BOUNTIES_CLAIMED],
        $triumphs[self::PERFECT_MATCHES_CLAIMED],
        $triumphs[self::COLLECTION_BADGE],
        $triumphs[self::XUR_BOUNTY]
      )
      && $triumphs[self::BOUNTIES_CLAIMED]
      && $triumphs[self::ASPIRING_BOUNTIES_CLAIMED]
      && $triumphs[self::TRUE_GUNSMITH_BOUNTIES_CLAIMED]
      && $triumphs[self::PERFECT_MATCHES_CLAIMED]
      && $triumphs[self::COLLECTION_BADGE]
      && $triumphs[self::XUR_BOUNTY];
  }

  public function getDataForRedux(): array
  {
    return [
      'bountiesDefault' => self::BOUNTIES_DEFAULT,
      'bountiesGoal' => self::BOUNTIES_GOAL,
      'aspiringBountiesDefault' => self::ASPIRING_BOUNTIES_DEFAULT,
      'aspiringBountiesGoal' => self::ASPIRING_BOUNTIES_GOAL,
      'trueGunsmithBountiesDefault' => self::TRUE_GUNSMITH_BOUNTIES_DEFAULT,
      'trueGunsmithBountiesGoal' => self::TRUE_GUNSMITH_BOUNTIES_GOAL,
      'perfectMatchesDefault' => self::PERFECT_MATCHES_DEFAULT,
      'perfectMatchesGoal' => self::PERFECT_MATCHES_GOAL,
    ];
  }
}
