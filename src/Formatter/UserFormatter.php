<?php

namespace App\Formatter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class UserFormatter
{
  private AuthorizationCheckerInterface $authorizationChecker;

  /**
   * UserFormatter constructor.
   * @param AuthorizationCheckerInterface $authorizationChecker
   */
  public function __construct(AuthorizationCheckerInterface $authorizationChecker)
  {
    $this->authorizationChecker = $authorizationChecker;
  }

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
      'characterClass' => $user->getCharacterClass(),
      'characterGender' => $user->getCharacterGender(),
      'characterRace' => $user->getCharacterRace(),
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
        'admin' => false,
      ];
    }

    return [
      'authenticated' => true,
      'admin' => $this->authorizationChecker->isGranted(User::ROLE_ADMIN),
      ...$this->formatUser($user),
    ];
  }
}
