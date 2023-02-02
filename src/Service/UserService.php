<?php

namespace App\Service;

use App\Formatter\UserFormatter;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserService
{
  private TokenStorageInterface $tokenStorage;
  private UserFormatter $userFormatter;

  public function __construct(TokenStorageInterface $tokenStorage, UserFormatter $userFormatter)
  {
    $this->tokenStorage = $tokenStorage;
    $this->userFormatter = $userFormatter;
  }

  /**
   * @return array
   */
  public function getUserRedux(): array
  {
    $user = $this->tokenStorage->getToken()?->getUser();
    return $this->userFormatter->formatUserRedux($user);
  }
}
