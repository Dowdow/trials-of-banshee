<?php

namespace App\Formatter;

use App\Entity\Sound;
use App\Entity\Weapon;

class SoundFormatter
{
  /**
   * @param array $sounds
   * @return array
   */
  public function formatSounds(array $sounds): array
  {
    $formattedSounds = [];
    foreach ($sounds as $sound) {
      $formattedSounds[] = $this->formatSound($sound);
    }

    return [
      'items' => $formattedSounds,
      'total' => count($formattedSounds),
    ];
  }

  /**
   * @param Sound $sound
   * @return array
   */
  public function formatSound(Sound $sound): array
  {
    return [
      'id' => $sound->getId(),
      'name' => $sound->getName(),
      'description' => $sound->getDescription(),
      'path' => $sound->getPath(),
      'weapons' => array_map(static function (Weapon $weapon) {
        return [
          'id' => $weapon->getId(),
          'type' => $weapon->getType(),
        ];
      }, $sound->getWeapons()->toArray()),
    ];
  }
}
