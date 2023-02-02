<?php

namespace App\Formatter;

use App\Entity\User;

class UserFormatter
{
  /**
   * @param User|null $user
   * @return array
   */
  public function formatUserRedux(?User $user = null): array
  {
    return [
      'authenticated' => $user !== null,
    ];
  }
}
