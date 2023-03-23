<?php

namespace App\Controller;

use App\Entity\Sound;
use App\Entity\User;
use App\Form\SoundType;
use App\Formatter\SoundFormatter;
use App\Repository\SoundRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class SoundApiController extends AbstractController
{
  #[Route('/sounds', name: 'api.sounds', methods: ['GET'])]
  public function sounds(ManagerRegistry $managerRegistry, SoundFormatter $soundFormatter): JsonResponse
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      throw $this->createNotFoundException();
    }

    $em = $managerRegistry->getManager();
    /** @var SoundRepository $soundRepository */
    $soundRepository = $em->getRepository(Sound::class);

    $sounds = $soundRepository->findAll();

    return new JsonResponse($soundFormatter->formatSounds($sounds));
  }

  #[Route('/sound/{id}', name: 'api.sound', methods: ['GET'])]
  public function sound(?Sound $sound, SoundFormatter $soundFormatter): JsonResponse
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      throw $this->createNotFoundException();
    }

    if ($sound === null) {
      return new JsonResponse(['errors' => ['Sound not found']], 404);
    }

    return new JsonResponse($soundFormatter->formatSound($sound));
  }

  #[Route('/sounds/add', name: 'api.sounds.add', methods: ['POST'])]
  public function addSound(Request $request, ManagerRegistry $managerRegistry, SoundFormatter $soundFormatter): JsonResponse
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      throw $this->createNotFoundException();
    }

    $sound = new Sound();
    $form = $this->createForm(SoundType::class, $sound);

    $form->submit([
      'name' => $request->request->get('name'),
      'description' => $request->request->get('description'),
      'weapons' => $request->request->all()['weapons'] ?? [],
      'file' => $request->files->get('file')
    ]);

    if ($form->isSubmitted() && $form->isValid()) {
      /** @var UploadedFile $file */
      $file = $form->get('file')->getData();
      if ($file) {
        $fileName = uniqid('', true) . '.' . $file->guessExtension();
        try {
          $file->move($this->getParameter('uploads_sounds_folder'), $fileName);
        } catch (FileException $e) {
          return new JsonResponse(['errors' => [$e->getMessage()]], 400);
        }
        $sound->setPath($fileName);
      }

      $em = $managerRegistry->getManager();
      $em->persist($sound);
      $em->flush();

      return new JsonResponse($soundFormatter->formatSound($sound), 201);
    }

    $errors = [];
    foreach ($form->getErrors(true) as $error) {
      $errors[] = $error->getMessage();
    }

    return new JsonResponse(['errors' => $errors], 400);
  }

  #[Route('/sounds/edit/{id}', name: 'api.sounds.edit', methods: ['POST'])]
  public function editSound(?Sound $sound, Request $request, ManagerRegistry $managerRegistry, SoundFormatter $soundFormatter): JsonResponse
  {
    if (!$this->isGranted(User::ROLE_ADMIN)) {
      throw $this->createNotFoundException();
    }

    if ($sound === null) {
      return new JsonResponse(['errors' => ['Sound not found']], 404);
    }

    $form = $this->createForm(SoundType::class, $sound);

    $form->submit([
      'name' => $request->request->get('name'),
      'description' => $request->request->get('description'),
      'weapons' => $request->request->all()['weapons'] ?? [],
      'file' => $request->files->get('file')
    ]);

    if ($form->isSubmitted() && $form->isValid()) {
      /** @var UploadedFile $file */
      $file = $form->get('file')->getData();
      if ($file) {
        $fileName = uniqid('', true) . '.' . $file->guessExtension();
        try {
          $file->move($this->getParameter('uploads_sounds_folder'), $fileName);
        } catch (FileException $e) {
          return new JsonResponse(['errors' => [$e->getMessage()]], 400);
        }
        @unlink($this->getParameter('uploads_sounds_folder') . DIRECTORY_SEPARATOR . $sound->getPath());
        $sound->setPath($fileName);
      }

      $em = $managerRegistry->getManager();
      $em->flush();

      return new JsonResponse($soundFormatter->formatSound($sound), 200);
    }

    $errors = [];
    foreach ($form->getErrors(true) as $error) {
      $errors[] = $error->getMessage();
    }

    return new JsonResponse(['errors' => $errors], 400);
  }
}
