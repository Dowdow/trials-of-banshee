<?php

namespace App\Service;

use App\Entity\User;
use Exception;

class CollectionService
{
  public const BEST_OF_Y1_ENGRAM = 'bestOfY1Engram';
  public const BRIGHT_ENGRAM = 'brightEngram';
  public const COMMON_ENGRAM = 'commonEngram';
  public const CRIMSON_ENGRAM = 'crimsonEngram';
  public const CRUCIBLE_ENGRAM = 'crucibleEngram';
  public const DAWNING_ENGRAM = 'dawningEngram';
  public const EPHEMERAL_ENGRAM = 'ephemeralEngram';
  public const ETCHED_ENGRAM = 'etchedEngram';
  public const EVERVERSE_ENGRAM = 'eververseEngram';
  public const EXOTIC_ENGRAM = 'exoticEngram';
  public const FOND_MEMORIES_ENGRAM = 'fondMemoriesEngram';
  public const GAMBIT_ENGRAM = 'gambitEngram';
  public const ILLUMINATED_ENGRAM = 'illuminatedEngram';
  public const IRON_BANNER_ENGRAM = 'ironBannerEngram';
  public const JUBILANT_ENGRAM = 'jubilantEngram';
  public const LEGENDARY_ENGRAM = 'legendaryEngram';
  public const LUMINOUS_ENGRAM = 'luminousEngram';
  public const MNEMONIC_ENGRAM = 'mnemonicEngram';
  public const NOSTALGIC_ENGRAM = 'nostalgicEngram';
  public const NOTORIOUS_ENGRAM = 'notoriousEngram';
  public const PRIME_ENGRAM = 'primeEngram';
  public const PROTOTYPE_ENGRAM = 'prototypeEngram';
  public const RARE_ENGRAM = 'rareEngram';
  public const SOLSTICE_ENGRAM = 'solsticeEngram';
  public const SPIDER_SPECIAL_ENGRAM = 'spiderSpecialEngram';
  public const STEADFAST_ENGRAM = 'steadfastEngram';
  public const TRIALS_ENGRAM = 'trialsEngram';
  public const UMBRAL_ENGRAM = 'umbralEngram';
  public const UNKNOWN_ENGRAM = 'unknownEngram';
  public const WINTERDRIFT_ENGRAM = 'winterdriftEngram';

  public const ENGRAMS = [
    self::BEST_OF_Y1_ENGRAM,
    self::BRIGHT_ENGRAM,
    self::COMMON_ENGRAM,
    self::CRIMSON_ENGRAM,
    self::CRUCIBLE_ENGRAM,
    self::DAWNING_ENGRAM,
    self::EPHEMERAL_ENGRAM,
    self::ETCHED_ENGRAM,
    self::EVERVERSE_ENGRAM,
    self::EXOTIC_ENGRAM,
    self::FOND_MEMORIES_ENGRAM,
    self::GAMBIT_ENGRAM,
    self::ILLUMINATED_ENGRAM,
    self::IRON_BANNER_ENGRAM,
    self::JUBILANT_ENGRAM,
    self::LEGENDARY_ENGRAM,
    self::LUMINOUS_ENGRAM,
    self::MNEMONIC_ENGRAM,
    self::NOSTALGIC_ENGRAM,
    self::NOTORIOUS_ENGRAM,
    self::PRIME_ENGRAM,
    self::PROTOTYPE_ENGRAM,
    self::RARE_ENGRAM,
    self::SOLSTICE_ENGRAM,
    self::SPIDER_SPECIAL_ENGRAM,
    self::STEADFAST_ENGRAM,
    self::TRIALS_ENGRAM,
    self::UMBRAL_ENGRAM,
    self::UNKNOWN_ENGRAM,
    self::WINTERDRIFT_ENGRAM,
  ];

  /**
   * Select a random engram
   * @param User $user
   * @return string
   */
  public function rewardDailyBountyCompletionEngram(User $user): string
  {
    $collections = $user->getCollections();
    $engram = self::ENGRAMS[array_rand(self::ENGRAMS)];
    $collections['engrams'][$engram] = true;
    $user->setCollections($collections);
    return $engram;
  }

  /**
   * Select either a random or a non owned engram
   * @param User $user
   * @return string
   */
  public function rewardAspiringBountyCompletionEngram(User $user): string
  {
    try {
      $rand = random_int(0, 1);
    } catch (Exception $e) {
      $rand = 0;
    }

    if ($rand === 0) {
      return $this->rewardDailyBountyCompletionEngram($user);
    }

    return $this->rewardGunsmithBountyCompletionEngram($user);
  }

  /**
   * Select a non owned engram
   * @param User $user
   * @return string
   */
  public function rewardGunsmithBountyCompletionEngram(User $user): string
  {
    $collections = $user->getCollections();
    $ownedEngrams = $collections['engrams'] ?? [];
    $engrams = self::ENGRAMS;
    foreach ($engrams as $k => $e) {
      if (array_key_exists($e, $ownedEngrams)) {
        unset($engrams[$k]);
      }
    }
    $engram = $engrams[array_rand($engrams)];
    $collections['engrams'][$engram] = true;
    $user->setCollections($collections);
    return $engram;
  }
}
