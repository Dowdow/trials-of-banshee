<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;

class BountySessionService
{
  private RequestStack $requestStack;

  /**
   * BountySessionService constructor.
   * @param RequestStack $requestStack
   */
  public function __construct(RequestStack $requestStack)
  {
    $this->requestStack = $requestStack;
  }

  private function init(): void
  {
    $session = $this->requestStack->getSession();
    if (!$session->has('bounties')) {
      $session->set('bounties', []);
    }
  }

  public function addTry()
  {
  }

  public function addHistory()
  {
  }
}
