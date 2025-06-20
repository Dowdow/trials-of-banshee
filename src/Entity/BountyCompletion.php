<?php

namespace App\Entity;

use App\Repository\BountyCompletionRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Bounty
 * @package App\Entity
 */
#[ORM\Entity(repositoryClass: BountyCompletionRepository::class)]
#[ORM\Table(name: 'bounty_completion')]
class BountyCompletion
{
  #[ORM\Id]
  #[ORM\GeneratedValue(strategy: 'AUTO')]
  #[ORM\Column]
  private ?int $id;

  #[ORM\Column]
  private int $attempts = 0;

  #[ORM\Column]
  private bool $completed = false;

  #[ORM\Column]
  private bool $perfectMatch = false;

  #[ORM\Column(nullable: true)]
  private ?bool $flawless = null;

  #[ORM\Column(type: 'json')]
  private array $history = [];

  #[ORM\ManyToOne(targetEntity: Bounty::class, inversedBy: 'bountyCompletions')]
  private ?Bounty $bounty;

  #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'bountyCompletions')]
  private ?User $user;

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getAttempts(): int
  {
    return $this->attempts;
  }

  public function addAttempt(): static
  {
    ++$this->attempts;
    return $this;
  }

  public function setAttempts(int $attempts): static
  {
    $this->attempts = $attempts;
    return $this;
  }

  public function isCompleted(): bool
  {
    return $this->completed;
  }

  public function setCompleted(bool $completed): static
  {
    $this->completed = $completed;
    return $this;
  }

  public function isPerfectMatch(): bool
  {
    return $this->perfectMatch;
  }

  public function setPerfectMatch(bool $perfectMatch): static
  {
    $this->perfectMatch = $perfectMatch;
    return $this;
  }

  public function isFlawless(): ?bool
  {
    return $this->flawless;
  }

  public function setFlawless(?bool $flawless): static
  {
    $this->flawless = $flawless;
    return $this;
  }

  public function getHistory(): array
  {
    return $this->history;
  }

  public function addHistory(int $weaponId): static
  {
    $this->history[] = $weaponId;
    return $this;
  }

  public function setHistory(array $history): static
  {
    $this->history = $history;
    return $this;
  }

  public function getBounty(): ?Bounty
  {
    return $this->bounty;
  }

  public function setBounty(Bounty $bounty): static
  {
    $this->bounty = $bounty;
    return $this;
  }

  public function getUser(): ?User
  {
    return $this->user;
  }

  public function setUser(User $user): static
  {
    $this->user = $user;
    return $this;
  }
}
