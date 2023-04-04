<?php

namespace App\Service;

use App\Entity\Bounty;
use App\Entity\BountyCompletion;
use App\Entity\User;
use App\Entity\Weapon;
use App\Exception\ClueNotFoundFromRequestException;
use App\Repository\BountyCompletionRepository;
use App\Repository\WeaponRepository;
use Doctrine\ORM\EntityManagerInterface;
use JsonException;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

class BountyCompletionService
{
  public const ASPIRING_BOUNTY_MAX_ATTEMPTS_FLAWLESS = 3;
  public const TRUE_GUNSMITH_BOUNTY_MAX_ATTEMPTS_FLAWLESS = 1;

  public const KNOWLEDGE_IN_KEY = 'include';
  public const KNOWLEDGE_OUT_KEY = 'exclude';

  public const DEFAULT_KNOWLEDGE = [
    self::KNOWLEDGE_IN_KEY => [
      BountyCompletion::CLUE_RARITY => [],
      BountyCompletion::CLUE_DAMAGE_TYPE => [],
      BountyCompletion::CLUE_WEAPON_TYPE => [],
    ],
    self::KNOWLEDGE_OUT_KEY => [
      BountyCompletion::CLUE_RARITY => [],
      BountyCompletion::CLUE_DAMAGE_TYPE => [],
      BountyCompletion::CLUE_WEAPON_TYPE => [],
    ]
  ];

  public const CLUE_RARITY_ATTEMPTS_NEEDED = 2;
  public const CLUE_DAMAGE_TYPE_ATTEMPTS_NEEDED = 4;
  public const CLUE_WEAPON_TYPE_ATTEMPTS_NEEDED = 6;

  private EntityManagerInterface $em;
  private LoggerInterface $logger;
  private RequestStack $requestStack;

  public function __construct(
    EntityManagerInterface $em,
    LoggerInterface $logger,
    RequestStack $requestStack
  )
  {
    $this->em = $em;
    $this->logger = $logger;
    $this->requestStack = $requestStack;
  }

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
      $flawless = $bountySession['flawless'] ?? null;
    }

    $bountyCompletion = new BountyCompletion();
    $bountyCompletion
      ->setAttempts($attempts ?? 0)
      ->setCompleted($completed ?? false)
      ->setClues($clues ?? [])
      ->setHistory($history ?? [])
      ->setFlawless($flawless ?? null);

    return $bountyCompletion;
  }

  public function saveBountyCompletionWithSession(Bounty $bounty, BountyCompletion $bountyCompletion): void
  {
    $session = $this->requestStack->getSession();
    $session->set('bounty_' . $bounty->getId(), [
      'attempts' => $bountyCompletion->getAttempts(),
      'completed' => $bountyCompletion->isCompleted(),
      'clues' => $bountyCompletion->getClues(),
      'history' => $bountyCompletion->getHistory(),
      'flawless' => $bountyCompletion->isFlawless(),
    ]);
  }

  public function isBountyCompletionFlawless(Bounty $bounty, BountyCompletion $bountyCompletion): ?bool
  {
    $type = $bounty->getType();
    if ($type === Bounty::TYPE_DAILY) {
      return null;
    }

    $attempts = $bountyCompletion->getAttempts();
    $completed = $bountyCompletion->isCompleted();
    $max = $type === Bounty::TYPE_ASPIRING ? self::ASPIRING_BOUNTY_MAX_ATTEMPTS_FLAWLESS : self::TRUE_GUNSMITH_BOUNTY_MAX_ATTEMPTS_FLAWLESS;

    if (($attempts < $max) && !$completed) {
      return null;
    }
    if (($attempts <= $max) && $completed) {
      return true;
    }
    return false;
  }

  public function getBountyCompletionKnowledge(Bounty $bounty, BountyCompletion $bountyCompletion): array
  {
    $knowledge = self::DEFAULT_KNOWLEDGE;

    $bountyWeapon = $bounty->getWeapon();
    if ($bountyWeapon === null) {
      return $knowledge;
    }

    /** @var WeaponRepository $weaponRepository */
    $weaponRepository = $this->em->getRepository(Weapon::class);
    $historyWeapons = $weaponRepository->findBy(['id' => $bountyCompletion->getHistory()]);
    foreach ($historyWeapons as $weapon) {
      if ($weapon->getRarity() === $bountyWeapon->getRarity()) {
        if (!in_array($weapon->getRarity(), $knowledge[self::KNOWLEDGE_IN_KEY][BountyCompletion::CLUE_RARITY], true)) {
          $knowledge[self::KNOWLEDGE_IN_KEY][BountyCompletion::CLUE_RARITY][] = $weapon->getRarity();
        }
      } else if (!in_array($weapon->getRarity(), $knowledge[self::KNOWLEDGE_OUT_KEY][BountyCompletion::CLUE_RARITY], true)) {
        $knowledge[self::KNOWLEDGE_OUT_KEY][BountyCompletion::CLUE_RARITY][] = $weapon->getRarity();
      }

      if ($weapon->getDamageType() === $bountyWeapon->getDamageType()) {
        if (!in_array($weapon->getDamageType(), $knowledge[self::KNOWLEDGE_IN_KEY][BountyCompletion::CLUE_DAMAGE_TYPE], true)) {
          $knowledge[self::KNOWLEDGE_IN_KEY][BountyCompletion::CLUE_DAMAGE_TYPE][] = $weapon->getDamageType();
        }
      } else if (!in_array($weapon->getDamageType(), $knowledge[self::KNOWLEDGE_OUT_KEY][BountyCompletion::CLUE_DAMAGE_TYPE], true)) {
        $knowledge[self::KNOWLEDGE_OUT_KEY][BountyCompletion::CLUE_DAMAGE_TYPE][] = $weapon->getDamageType();
      }

      if ($weapon->getType() === $bountyWeapon->getType()) {
        if (!in_array($weapon->getType(), $knowledge[self::KNOWLEDGE_IN_KEY][BountyCompletion::CLUE_WEAPON_TYPE], true)) {
          $knowledge[self::KNOWLEDGE_IN_KEY][BountyCompletion::CLUE_WEAPON_TYPE][] = $weapon->getType();
        }
      } else if (!in_array($weapon->getType(), $knowledge[self::KNOWLEDGE_OUT_KEY][BountyCompletion::CLUE_WEAPON_TYPE], true)) {
        $knowledge[self::KNOWLEDGE_OUT_KEY][BountyCompletion::CLUE_WEAPON_TYPE][] = $weapon->getType();
      }
    }

    return $knowledge;
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
      $this->logger->error($e);
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
