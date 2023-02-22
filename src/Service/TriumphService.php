<?php

namespace App\Service;

use App\Entity\User;

class TriumphService
{
  public const BOUNTIES = 'bounties'; // Total completed bounties
  public const BOUNTIES_DEFAULT = 0;
  public const ASPIRING_BOUNTIES = 'aspiringBounties'; // Total completed aspiring bounties
  public const ASPIRING_BOUNTIES_DEFAULT = 0;
  public const TRUE_GUNSMITH_BOUNTIES = 'trueGunsmithBounties'; // Total completed true gunsmith bounties
  public const TRUE_GUNSMITH_BOUNTIES_DEFAULT = 0;
  public const PERFECT_MATCHES = 'perfectMatches'; // Total perfect match bounties
  public const PERFECT_MATCHES_DEFAULT = 0;
  public const COLLECTION_BADGE = 'collectionBadge'; // Collection badge
  public const COLLECTION_BADGE_DEFAULT = false;
  public const XUR_BOUNTY = 'xurBounty'; // Xur secret bounty
  public const XUR_BOUNTY_DEFAULT = false;
  public const GUNSMITH_TITLE = 'gunsmithTitle';
  public const GUNSMITH_TITLE_DEFAULT = false;

  public function addBountyCompletion(User $user): void
  {
    $triumphs = $user->getTriumphs();
    if (!array_key_exists(self::BOUNTIES, $triumphs)) {
      $triumphs[self::BOUNTIES] = self::BOUNTIES_DEFAULT;
    }
    ++$triumphs[self::BOUNTIES];
    $user->setTriumphs($triumphs);
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

  public function addTrueGunsmithBountyCompletion(User $user): void
  {
    $triumphs = $user->getTriumphs();
    if (!array_key_exists(self::TRUE_GUNSMITH_BOUNTIES, $triumphs)) {
      $triumphs[self::TRUE_GUNSMITH_BOUNTIES] = self::TRUE_GUNSMITH_BOUNTIES_DEFAULT;
    }
    ++$triumphs[self::TRUE_GUNSMITH_BOUNTIES];
    $user->setTriumphs($triumphs);
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

  public function setCollectionBadge(User $user, bool $value = self::COLLECTION_BADGE_DEFAULT): void
  {
    $triumphs = $user->getTriumphs();
    $triumphs[self::COLLECTION_BADGE] = $value;
    $user->setTriumphs($triumphs);
  }

  public function setXurBounty(User $user, bool $value = self::XUR_BOUNTY_DEFAULT): void
  {
    $triumphs = $user->getTriumphs();
    $triumphs[self::XUR_BOUNTY] = $value;
    $user->setTriumphs($triumphs);
  }

  public function setGunsmithTitle(User $user, bool $value = self::GUNSMITH_TITLE_DEFAULT): void
  {
    $triumphs = $user->getTriumphs();
    $triumphs[self::GUNSMITH_TITLE] = $value;
    $user->setTriumphs($triumphs);
  }
}
