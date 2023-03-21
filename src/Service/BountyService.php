<?php

namespace App\Service;

use App\Entity\Bounty;
use App\Entity\BountyCompletion;
use App\Entity\User;
use App\Entity\Weapon;
use App\Exception\ClueNotFoundFromRequestException;
use App\Repository\BountyCompletionRepository;
use Doctrine\ORM\EntityManagerInterface;
use JsonException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class BountyService
{
  public const ASPIRING_BOUNTY_MAX_ATTEMPTS_SUCCESS = 3;
  public const TRUE_GUNSMITH_BOUNTY_MAX_ATTEMPTS_SUCCESS = 1;

  public const CLUE_RARITY_ATTEMPTS_NEEDED = 2;
  public const CLUE_DAMAGE_TYPE_ATTEMPTS_NEEDED = 4;
  public const CLUE_WEAPON_TYPE_ATTEMPTS_NEEDED = 6;

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
   * @param User $user
   * @param bool $persist
   * @return BountyCompletion
   */
  public function findOrCreateBountyCompletion(Bounty $bounty, User $user, bool $persist = false): BountyCompletion
  {
    /** @var BountyCompletionRepository $bountyCompletionRepository */
    $bountyCompletionRepository = $this->em->getRepository(BountyCompletion::class);
    /** @var BountyCompletion|null $bountyCompletion */
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

  /**
   * @param Bounty $bounty
   * @param Weapon $weapon
   * @return bool
   */
  public function isWeaponCorrect(Bounty $bounty, Weapon $weapon): bool
  {
    $bountySounds = $bounty->getWeapon()?->getSounds() ?? [];
    foreach ($bountySounds as $sound) {
      if ($weapon->hasSound($sound)) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param Bounty $bounty
   * @param Weapon $weapon
   * @return bool
   */
  public function isWeaponPerfectMatch(Bounty $bounty, Weapon $weapon): bool
  {
    $bountyWeapon = $bounty->getWeapon();
    return $bountyWeapon && $bountyWeapon->getId() === $weapon->getId();
  }

  /**
   * @param Request $request
   * @return string
   * @throws ClueNotFoundFromRequestException
   */
  public function retrieveClueTypeFromRequest(Request $request): string
  {
    try {
      $content = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
      $content = [];
    }

    $clueType = $content['clueType'] ?? null;
    if ($clueType === null) {
      throw new ClueNotFoundFromRequestException('`clueType` needed for the clue');
    }
    if (!in_array($clueType, BountyCompletion::CLUE_TYPES, true)) {
      throw new ClueNotFoundFromRequestException('Invalid clueType');
    }
    return $clueType;
  }

  /**
   * @param BountyCompletion $bountyCompletion
   * @param string $clueType
   * @return bool
   */
  public function isClueValid(BountyCompletion $bountyCompletion, string $clueType): bool
  {
    if ($bountyCompletion->hasClue($clueType)) {
      return false;
    }
    $attempts = $bountyCompletion->getAttempts();
    if ($clueType === BountyCompletion::CLUE_RARITY && $attempts >= self::CLUE_RARITY_ATTEMPTS_NEEDED) {
      return true;
    }
    if ($clueType === BountyCompletion::CLUE_DAMAGE_TYPE && $attempts >= self::CLUE_DAMAGE_TYPE_ATTEMPTS_NEEDED) {
      return true;
    }
    if ($clueType === BountyCompletion::CLUE_WEAPON_TYPE && $attempts >= self::CLUE_WEAPON_TYPE_ATTEMPTS_NEEDED) {
      return true;
    }
    return false;
  }
}
