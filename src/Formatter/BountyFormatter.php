<?php

namespace App\Formatter;

use App\Entity\Bounty;

class BountyFormatter
{
  /**
   * @param array $bounties
   * @return array
   */
  public function formatTodayBounties(array $bounties): array
  {
    $formattedBounties = [];
    foreach ($bounties as $bounty) {
      $formattedBounties[] = $this->formatTodayBounty($bounty);
    }

    return [
      'items' => $formattedBounties,
      'total' => count($formattedBounties),
    ];
  }

  /**
   * @param Bounty $bounty
   * @return array
   */
  public function formatTodayBounty(Bounty $bounty): array
  {
    return [
      'id' => $bounty->getId(),
      'type' => $bounty->getType(),
      'audio' => $bounty->getWeapon()?->getSounds()?->first()?->getPath(),
      'tries' => 0,
      'clues' => [
        'damageType' => null,
        'rarity' => null,
        'type' => null,
      ],
      'history' => [],
    ];
  }
}
