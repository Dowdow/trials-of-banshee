<?php

namespace App\Formatter;

use App\Entity\Bounty;
use App\Entity\BountyCompletion;
use App\Entity\User;
use App\Service\BountyService;

class BountyFormatter
{
  private BountyService $bountyService;

  public function __construct(BountyService $bountyService)
  {
    $this->bountyService = $bountyService;
  }

  /**
   * @param User $user
   * @param Bounty[] $bounties
   * @return array
   */
  public function formatBounties(User $user, array $bounties): array
  {
    $formattedBounties = [];
    foreach ($bounties as $bounty) {
      $bountyCompletion = $this->bountyService->findOrCreateBountyCompletion($bounty, $user);
      $formattedBounties[] = $this->formatBounty($bounty, $bountyCompletion);
    }

    return [
      'items' => $formattedBounties,
      'total' => count($formattedBounties),
    ];
  }

  /**
   * @param Bounty[] $bounties
   * @return array
   */
  public function formatBountiesNotAuthenticated(array $bounties): array
  {
    $formattedBounties = [];
    foreach ($bounties as $bounty) {
      $bountyCompletion = $this->bountyService->findOrCreateBountyCompletionWithSesion($bounty);
      $this->bountyService->saveBountyCompletionWithSession($bounty, $bountyCompletion);
      $formattedBounties[] = $this->formatBounty($bounty, $bountyCompletion);
    }

    return [
      'items' => $formattedBounties,
      'total' => count($formattedBounties),
    ];
  }

  public function formatBounty(Bounty $bounty, ?BountyCompletion $bountyCompletion = null, ?string $loot = null): array
  {
    return [
      'id' => $bounty->getId(),
      'type' => $bounty->getType(),
      'audio' => $bounty->getWeapon()?->getSounds()?->first()?->getPath(),
      'attempts' => $bountyCompletion?->getAttempts() ?? 0,
      'completed' => $bountyCompletion?->isCompleted() ?? false,
      'perfectMatch' => $bountyCompletion?->isPerfectMatch() ?? false,
      'flawless' => $bountyCompletion?->isFlawless(),
      'clues' => $bountyCompletion?->getClues() ?? [],
      'history' => $bountyCompletion?->getHistory() ?? [],
      'loot' => $loot,
    ];
  }
}
