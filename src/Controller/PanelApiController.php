<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\PanelService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class PanelApiController extends AbstractController
{
  #[Route('/panel/cache', name: 'api.panel.cache', methods: ['POST'])]
  public function panelCache(PanelService $panelService): NotFoundHttpException|StreamedResponse
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      return $this->createNotFoundException();
    }

    $generator = $panelService->destinyWeaponsCache();
    return new StreamedResponse(function () use ($generator) {
      foreach ($generator as $data) {
        echo "$data\n";
        if (ob_get_contents() !== false) {
          ob_flush();
        }
        flush();
      }
    });
  }

  #[Route('/panel/parse', name: 'api.panel.parse', methods: ['POST'])]
  public function panelParse(PanelService $panelService): NotFoundHttpException|StreamedResponse
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      return $this->createNotFoundException();
    }

    $generator = $panelService->destinyWeaponsParse();
    return new StreamedResponse(function () use ($generator) {
      foreach ($generator as $data) {
        echo "$data\n";
        if (ob_get_contents() !== false) {
          ob_flush();
        }
        flush();
      }
    });
  }

  #[Route('/panel/hide', name: 'api.panel.hide', methods: ['POST'])]
  public function panelHide(PanelService $panelService): NotFoundHttpException|StreamedResponse
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      return $this->createNotFoundException();
    }

    $generator = $panelService->destinyWeaponsHide();
    return new StreamedResponse(function () use ($generator) {
      foreach ($generator as $data) {
        echo "$data\n";
        if (ob_get_contents() !== false) {
          ob_flush();
        }
        flush();
      }
    });
  }

  #[Route('/panel/bounty', name: 'api.panel.bounty', methods: ['POST'])]
  public function panelBounty(PanelService $panelService): NotFoundHttpException|StreamedResponse
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      return $this->createNotFoundException();
    }

    $generator = $panelService->bountyCreate();
    return new StreamedResponse(function () use ($generator) {
      foreach ($generator as $data) {
        echo "$data\n";
        if (ob_get_contents() !== false) {
          ob_flush();
        }
        flush();
      }
    });
  }
}
