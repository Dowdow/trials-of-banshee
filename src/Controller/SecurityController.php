<?php

namespace App\Controller;

use App\Service\DestinyAPIClientService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/oauth')]
class SecurityController extends AbstractController
{
  /**
   * @param DestinyAPIClientService $destinyAPIClientService
   * @return RedirectResponse
   */
  #[Route('/authorize', name: 'security.authorize')]
  public function authorize(DestinyAPIClientService $destinyAPIClientService): RedirectResponse
  {
    return $this->redirect($destinyAPIClientService->getAuthorizationUrl());
  }

  /**
   * @return RedirectResponse
   */
  #[Route('/callback', name: 'security.callback')]
  public function callback(): RedirectResponse
  {
    return $this->redirectToRoute('app.index');
  }
}
