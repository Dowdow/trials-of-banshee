<?php

namespace App\Formatter;

use App\Entity\User;

class UserFormatter
{
  /**
   * @param User $user
   * @return array
   */
  public function formatUser(User $user): array
  {
    return [
      'displayName' => $user->getDisplayName(),
      'emblemPath' => $user->getEmblemPath(),
      'emblemBackgroundPath' => $user->getEmblemBackgroundPath(),
      'lightLevel' => $user->getLightLevel(),
    ];
  }

  /**
   * @param User|null $user
   * @return array
   */
  public function formatUserRedux(?User $user = null): array
  {
    if ($user === null) {
      return [
        'authenticated' => false,
      ];
    }

    return [
      'authenticated' => true,
      ...$this->formatUser($user),
    ];
  }
}
