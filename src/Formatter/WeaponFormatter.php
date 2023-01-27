<?php

namespace App\Formatter;

use App\Entity\Weapon;

class WeaponFormatter
{
  /**
   * @param array $weapons
   * @return array
   */
  public function formatWeapons(array $weapons): array
  {
    $formattedWeapons = [];
    foreach ($weapons as $weapon) {
      $formattedWeapons[] = $this->formatWeapon($weapon);
    }

    return [
      'weapons' => $formattedWeapons,
      'total' => count($formattedWeapons),
    ];
  }

  /**
   * @param Weapon $weapon
   * @return array
   */
  public function formatWeapon(Weapon $weapon): array
  {
    return [
      'id' => $weapon->getId(),
      'names' => $weapon->getNames(),
      'icon' => $weapon->getIcon(),
      'screenshot' => $weapon->getScreenshot(),
      'type' => $weapon->getType(),
      'damageType' => $weapon->getDamageType(),
      'rarity' => $weapon->getRarity(),
    ];
  }
}
