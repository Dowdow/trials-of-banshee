<?php

namespace App\Controller;

use App\Entity\Sound;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
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
  #[Route('/collection', name: 'app.collection', methods: ['GET'])]
  public function collection(): Response
  {
    return $this->render('base.html.twig');
  }

  /**
   * @return Response
   */
  #[Route('/triumphs', name: 'app.triumphs', methods: ['GET'])]
  public function triumphs(): Response
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

  /**
   * @return Response
   */
  #[Route('/sounds', name: 'app.sounds', methods: ['GET'])]
  public function sounds(): Response
  {
    return $this->render('base.html.twig');
  }

  /**
   * @return Response
   */
  #[Route('/sounds/add', name: 'app.sounds.add', methods: ['GET'])]
  public function soundAdd(): Response
  {
    return $this->render('base.html.twig');
  }

  /**
   * @param Sound $sound
   * @return Response
   */
  #[Route('/sounds/edit/{id}', name: 'app.sounds.edit', methods: ['GET'])]
  public function soundEdit(Sound $sound): Response
  {
    if ($sound === null) {
      throw new NotFoundHttpException();
    }

    return $this->render('base.html.twig');
  }
}
