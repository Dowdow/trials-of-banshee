<?php

namespace App\Controller;

use App\Entity\Bounty;
use App\Entity\Weapon;
use App\Formatter\BountyFormatter;
use App\Repository\BountyRepository;
use App\Repository\WeaponRepository;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class BountyApiController extends AbstractController
{
  /**
   * @param ManagerRegistry $managerRegistry
   * @param BountyFormatter $bountyFormatter
   * @return JsonResponse
   */
  #[Route('/bounties/today', name: 'api.bounties.today', methods: ['GET'])]
  public function bountiesToday(ManagerRegistry $managerRegistry, BountyFormatter $bountyFormatter): JsonResponse
  {
    $em = $managerRegistry->getManager();
    /** @var BountyRepository */
    $bountyRepository = $em->getRepository(Bounty::class);

    $currentDateTime = new DateTime();
    $todayBountyDate = clone $currentDateTime;
    $todayBountyDate->setTime(17, 0, 0, 0);

    if ($currentDateTime < $todayBountyDate) {
      $todayBountyDate->modify('-1 day');
    }

    $bounties = $bountyRepository->findBy(['dateStart' => $todayBountyDate]);

    // TODO If connected check if already completed

    return new JsonResponse($bountyFormatter->formatTodayBounties($bounties));
  }

  /**
   * @return JsonResponse
   */
  #[Route('/bounty/{id}/guess', name: 'api.bounty.guess', methods: ['POST'])]
  public function bountyGuess(Bounty $bounty, Request $request, ManagerRegistry $managerRegistry, BountyFormatter $bountyFormatter): JsonResponse
  {
    if ($bounty === null) {
      return new JsonResponse(['errors' => ['Bounty not found']], 404);
    }

    // Si pas connecté et bounty autre que daily c'est interdit

    // On ne check pas si le bounty a expiré car le joueur peut avoir du retard 
    // Par contre on check qu'il ne fasse pas le bounty en avance
    $date = new DateTime();
    if ($date < $bounty->getDateStart()) {
      return new JsonResponse(['errors' => ['Bounty not available yet. Be patient Guardian']], 400);
    }

    $content = json_decode($request->getContent(), true);
    $weaponId = $content['weaponId'] ?? null;

    if ($weaponId === null) {
      return new JsonResponse(['errors' => ['`weaponId` needed for the guess']], 400);
    }

    $em = $managerRegistry->getManager();
    /** @var WeaponRepository */
    $weaponRepository = $em->getRepository(Weapon::class);

    $weapon = $weaponRepository->findOneBy(['id' => $weaponId, 'hidden' => false]);
    if ($weapon === null) {
      return new JsonResponse(['errors' => ['Weapon not found']], 404);
    }


    // TODO si bonne réponse

    // TODO si mauvaise réponse on renvoit le bounty + trie +1 + history

    return new JsonResponse($bountyFormatter->formatTodayBounty($bounty));
  }
}
