<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
  /**
   * @return Response
   */
  #[Route('/', name: 'app.index', methods: ['GET'])]
  public function index(): Response
  {
    return $this->render('base.html.twig');
  }

  /**
   * @return Response
   */
  #[Route('/trials', name: 'app.trials', methods: ['GET'])]
  public function trials(): Response
  {
    return $this->render('base.html.twig');
  }

  /**
   * @return Response
   */
  #[Route('/weapons', name: 'app.weapons', methods: ['GET'])]
  public function weapons(): Response
  {
    return $this->render('base.html.twig');
  }
}
