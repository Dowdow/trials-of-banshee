<?php

namespace App\Controller;

use App\Entity\Sound;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
  #[Route('/', name: 'app.index', methods: ['GET'])]
  public function index(): Response
  {
    return $this->render('base.html.twig');
  }

  #[Route('/trials', name: 'app.trials', methods: ['GET'])]
  public function trials(): Response
  {
    return $this->render('base.html.twig');
  }

  #[Route('/collection', name: 'app.collection', methods: ['GET'])]
  public function collection(): Response
  {
    return $this->render('base.html.twig');
  }

  #[Route('/triumphs', name: 'app.triumphs', methods: ['GET'])]
  public function triumphs(): Response
  {
    return $this->render('base.html.twig');
  }

  #[Route('/weapons', name: 'app.weapons', methods: ['GET'])]
  public function weapons(): Response
  {
    return $this->render('base.html.twig');
  }

  #[Route('/sounds', name: 'app.sounds', methods: ['GET'])]
  public function sounds(): Response
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      throw $this->createNotFoundException();
    }

    return $this->render('base.html.twig');
  }

  #[Route('/sounds/add', name: 'app.sounds.add', methods: ['GET'])]
  public function soundAdd(): Response
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      throw $this->createNotFoundException();
    }

    return $this->render('base.html.twig');
  }

  #[Route('/sounds/edit/{id}', name: 'app.sounds.edit', methods: ['GET'])]
  public function soundEdit(?Sound $sound): Response
  {
    if ($sound === null || !$this->isGranted(User::ROLE_ADMIN)) {
      throw $this->createNotFoundException();
    }

    return $this->render('base.html.twig');
  }

  #[Route('/panel', name: 'app.panel', methods: ['GET'])]
  public function panel(): Response
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      throw $this->createNotFoundException();
    }

    return $this->render('base.html.twig');
  }
}
