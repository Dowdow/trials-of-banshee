<?php

namespace App\TwigExtension;

use App\Service\UserService;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ReduxExtension extends AbstractExtension
{
  private UserService $userService;

  public function __construct(UserService $userService)
  {
    $this->userService = $userService;
  }

  /**
   * @return string
   */
  public function getPreLoadedState(): string
  {
    $preLoadedState = [
      'user' => $this->userService->getUserRedux()
    ];

    return json_encode($preLoadedState);
  }

  public function getFunctions(): array
  {
    return [
      new TwigFunction('getPreLoadedState', [$this, 'getPreLoadedState']),
    ];
  }
}
