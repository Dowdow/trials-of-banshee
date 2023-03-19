<?php

namespace App\Controller;

use App\Service\DestinyAPIClientService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/oauth')]
class SecurityController extends AbstractController
{
  #[Route('/authorize', name: 'security.authorize')]
  public function authorize(DestinyAPIClientService $destinyAPIClient): RedirectResponse
  {
    return $this->redirect($destinyAPIClient->getAuthorizationUrl());
  }

  #[Route('/callback', name: 'security.callback')]
  public function callback(): RedirectResponse
  {
    return $this->redirectToRoute('app.index');
  }

  #[Route('/logout', name: 'security.logout')]
  public function logout(Security $security): RedirectResponse
  {
    $security->logout(false);
    return $this->redirectToRoute('app.index');
  }
}
