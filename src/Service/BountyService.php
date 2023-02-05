<?php

namespace App\Service;

use App\Entity\Bounty;
use App\Entity\BountyCompletion;
use App\Entity\User;
use App\Entity\Weapon;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class BountyService
{
  private EntityManagerInterface $em;
  private RequestStack $requestStack;

  /**
   * BountyService constructor.
   * @param EntityManagerInterface $em
   * @param RequestStack $requestStack
   */
  public function __construct(EntityManagerInterface $em, RequestStack $requestStack)
  {
    $this->em = $em;
    $this->requestStack = $requestStack;
  }

  /**
   * @param Bounty $bounty
   * @param Weapon $weapon
   * @return bool
   */
  public function isWeaponCorrect(Bounty $bounty, Weapon $weapon): bool
  {
    $bountySounds = $bounty->getWeapon()->getSounds();
    foreach ($bountySounds as $sound) {
      if ($weapon->hasSound($sound)) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param Bounty $bounty
   * @param User $user
   * @param bool $persist
   * @return BountyCompletion
   */
  public function findOrCreateBountyCompletion(Bounty $bounty, User $user, bool $persist = false): BountyCompletion
  {
    /** @var BountyCompletionRepository */
    $bountyCompletionRepository = $this->em->getRepository(BountyCompletion::class);
    /** @var BountyCompletion|null */
    $bountyCompletion = $bountyCompletionRepository->findOneBy(['user' => $user, 'bounty' => $bounty]);
    if ($bountyCompletion === null) {
      $bountyCompletion = new BountyCompletion();
      $bountyCompletion
        ->setBounty($bounty)
        ->setUser($user);
      if ($persist) {
        $this->em->persist($bountyCompletion);
      }
    }

    return $bountyCompletion;
  }

  /**
   * @param Bounty $bounty
   * @return BountyCompletion
   */
  public function findOrCreateBountyCompletionWithSesion(Bounty $bounty): BountyCompletion
  {
    $session = $this->requestStack->getSession();
    $bountySessionName = 'bounty_' . $bounty->getId();
    if ($session->has($bountySessionName)) {
      $bountySession = $session->get($bountySessionName);
      $attempts = $bountySession['attempts'] ?? null;
      $completed = $bountySession['completed'] ?? null;
      $clues = $bountySession['clues'] ?? null;
      $history = $bountySession['history'] ?? null;
    }

    $bountyCompletion = new BountyCompletion();
    $bountyCompletion
      ->setAttempts($attempts ?? 0)
      ->setCompleted($completed ?? false)
      ->setClues($clues ?? [])
      ->setHistory($history ?? []);

    return $bountyCompletion;
  }

  /**
   * @param Bounty $bounty
   * @param BountyCompletion $bountyCompletion
   * @return void
   */
  public function saveBountyCompletionWithSession(Bounty $bounty, BountyCompletion $bountyCompletion): void
  {
    $session = $this->requestStack->getSession();
    $session->set('bounty_' . $bounty->getId(), [
      'attempts' => $bountyCompletion->getAttempts(),
      'completed' => $bountyCompletion->isCompleted(),
      'clues' => $bountyCompletion->getClues(),
      'history' => $bountyCompletion->getHistory(),
    ]);
  }
}
