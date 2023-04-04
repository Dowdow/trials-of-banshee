<?php

namespace App\Formatter;

use App\Entity\Bounty;
use App\Entity\BountyCompletion;
use App\Entity\User;
use App\Service\BountyCompletionService;

class BountyFormatter
{
  private BountyCompletionService $bountyCompletionService;

  public function __construct(BountyCompletionService $bountyCompletionService)
  {
    $this->bountyCompletionService = $bountyCompletionService;
  }

  /**
   * @param User $user
   * @param Bounty[] $bounties
   * @param int $completions
   * @return array
   */
  public function formatBounties(User $user, array $bounties, int $completions): array
  {
    $formattedBounties = [];
    foreach ($bounties as $bounty) {
      $bountyCompletion = $this->bountyCompletionService->findOrCreateBountyCompletion($bounty, $user);
      $formattedBounties[] = $this->formatBounty($bounty, $bountyCompletion);
    }

    return [
      'items' => $formattedBounties,
      'total' => count($formattedBounties),
      'completions' => $completions,
    ];
  }

  /**
   * @param Bounty[] $bounties
   * @param int $completions
   * @return array
   */
  public function formatBountiesNotAuthenticated(array $bounties, int $completions): array
  {
    $formattedBounties = [];
    foreach ($bounties as $bounty) {
      $bountyCompletion = $this->bountyCompletionService->findOrCreateBountyCompletionWithSesion($bounty);
      $this->bountyCompletionService->saveBountyCompletionWithSession($bounty, $bountyCompletion);
      $formattedBounties[] = $this->formatBounty($bounty, $bountyCompletion);
    }

    return [
      'items' => $formattedBounties,
      'total' => count($formattedBounties),
      'completions' => $completions,
    ];
  }

  public function formatBounty(Bounty $bounty, ?BountyCompletion $bountyCompletion = null, ?string $loot = null): array
  {
    if ($bountyCompletion !== null) {
      $knowledge = $this->bountyCompletionService->getBountyCompletionKnowledge($bounty, $bountyCompletion);
    }

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
      'knowledge' => $knowledge ?? BountyCompletionService::DEFAULT_KNOWLEDGE,
      'loot' => $loot,
    ];
  }
}
