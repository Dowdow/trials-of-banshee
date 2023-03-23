<?php

namespace App\TwigExtension;

use App\Service\CollectionService;
use App\Service\TriumphService;
use App\Service\UserService;
use JsonException;
use Psr\Log\LoggerInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class ReduxExtension extends AbstractExtension
{
  private CollectionService $collectionService;
  private TriumphService $triumphService;
  private UserService $userService;
  private LoggerInterface $logger;

  public function __construct(
    CollectionService $collectionService,
    TriumphService $triumphService,
    UserService $userService,
    LoggerInterface $logger
  )
  {
    $this->collectionService = $collectionService;
    $this->triumphService = $triumphService;
    $this->userService = $userService;
    $this->logger = $logger;
  }

  /**
   * @return string
   */
  public function getPreLoadedState(): string
  {
    $preLoadedState = [
      'collections' => $this->collectionService->getDataForRedux(),
      'triumphs' => $this->triumphService->getDataForRedux(),
      'user' => $this->userService->getUserRedux()
    ];

    try {
      return json_encode($preLoadedState, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
      $this->logger->error($e);
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
