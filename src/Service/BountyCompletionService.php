<?php

namespace App\Service;

use App\Entity\Bounty;
use App\Entity\BountyCompletion;
use App\Entity\User;
use App\Entity\Weapon;
use App\Repository\BountyCompletionRepository;
use App\Repository\WeaponRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class BountyCompletionService
{
  public const ASPIRING_BOUNTY_MAX_ATTEMPTS_FLAWLESS = 3;
  public const TRUE_GUNSMITH_BOUNTY_MAX_ATTEMPTS_FLAWLESS = 1;

  public const KNOWLEDGE_IN_KEY = 'include';
  public const KNOWLEDGE_OUT_KEY = 'exclude';

  public const CLUE_RARITY = 'rarity';
  public const CLUE_DAMAGE_TYPE = 'damageType';
  public const CLUE_WEAPON_TYPE = 'weaponType';

  public const DEFAULT_KNOWLEDGE = [
    self::KNOWLEDGE_IN_KEY => [
      self::CLUE_RARITY => [],
      self::CLUE_DAMAGE_TYPE => [],
      self::CLUE_WEAPON_TYPE => [],
    ],
    self::KNOWLEDGE_OUT_KEY => [
      self::CLUE_RARITY => [],
      self::CLUE_DAMAGE_TYPE => [],
      self::CLUE_WEAPON_TYPE => [],
    ]
  ];

  private EntityManagerInterface $em;
  private RequestStack $requestStack;

  public function __construct(
    EntityManagerInterface $em,
    RequestStack $requestStack
  )
  {
    $this->em = $em;
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
      $history = $bountySession['history'] ?? null;
      $flawless = $bountySession['flawless'] ?? null;
    }

    $bountyCompletion = new BountyCompletion();
    $bountyCompletion
      ->setAttempts($attempts ?? 0)
      ->setCompleted($completed ?? false)
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

    foreach ($bountyCompletion->getHistory() as $history) {
      $weapon = null;
      foreach ($historyWeapons as $w) {
        if ($w->getId() === $history) {
          $weapon = $w;
          break;
        }
      }

      if ($weapon === null) {
        continue;
      }

      // Weapon Type Knowledge
      if ($weapon->getType() === $bountyWeapon->getType()) {
        if (!in_array($weapon->getType(), $knowledge[self::KNOWLEDGE_IN_KEY][self::CLUE_WEAPON_TYPE], true)) {
          $knowledge[self::KNOWLEDGE_IN_KEY][self::CLUE_WEAPON_TYPE][] = $weapon->getType();
          continue;
        }
      } else if (!in_array($weapon->getType(), $knowledge[self::KNOWLEDGE_OUT_KEY][self::CLUE_WEAPON_TYPE], true)) {
        $knowledge[self::KNOWLEDGE_OUT_KEY][self::CLUE_WEAPON_TYPE][] = $weapon->getType();
      }

      // Damage Type Knowledge, only when weapon type is found
      if (!empty($knowledge[self::KNOWLEDGE_IN_KEY][self::CLUE_WEAPON_TYPE])) {
        if ($weapon->getDamageType() === $bountyWeapon->getDamageType()) {
          if (!in_array($weapon->getDamageType(), $knowledge[self::KNOWLEDGE_IN_KEY][self::CLUE_DAMAGE_TYPE], true)) {
            $knowledge[self::KNOWLEDGE_IN_KEY][self::CLUE_DAMAGE_TYPE][] = $weapon->getDamageType();
            continue;
          }
        } else if (!in_array($weapon->getDamageType(), $knowledge[self::KNOWLEDGE_OUT_KEY][self::CLUE_DAMAGE_TYPE], true)) {
          $knowledge[self::KNOWLEDGE_OUT_KEY][self::CLUE_DAMAGE_TYPE][] = $weapon->getDamageType();
        }
      }

      // Rarity Knowledge, only if damage type is found
      if (!empty($knowledge[self::KNOWLEDGE_IN_KEY][self::CLUE_DAMAGE_TYPE])) {
        if ($weapon->getRarity() === $bountyWeapon->getRarity()) {
          if (!in_array($weapon->getRarity(), $knowledge[self::KNOWLEDGE_IN_KEY][self::CLUE_RARITY], true)) {
            $knowledge[self::KNOWLEDGE_IN_KEY][self::CLUE_RARITY][] = $weapon->getRarity();
          }
        } else if (!in_array($weapon->getRarity(), $knowledge[self::KNOWLEDGE_OUT_KEY][self::CLUE_RARITY], true)) {
          $knowledge[self::KNOWLEDGE_OUT_KEY][self::CLUE_RARITY][] = $weapon->getRarity();
        }
      }
    }

    return $knowledge;
  }
}
