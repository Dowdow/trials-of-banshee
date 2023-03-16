<?php

namespace App\TwigExtension;

use App\Service\UserService;
use JsonException;
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

    try {
      return json_encode($preLoadedState, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
      return '';
    }
  }

  public function getFunctions(): array
  {
    return [
      new TwigFunction('getPreLoadedState', [$this, 'getPreLoadedState']),
    ];
  }
}
