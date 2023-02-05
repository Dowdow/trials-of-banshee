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

  #[ORM\Column(nullable: true)]
  private ?bool $succeeded = null;

  #[ORM\Column(type: 'json')]
  private array $clues = [];

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
    $this->attempts += 1;
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

  public function isSucceeded(): ?bool
  {
    return $this->succeeded;
  }

  public function setSucceeded(bool $succeeded): static
  {
    $this->succeeded = $succeeded;
    return $this;
  }

  public function getClues(): array
  {
    return $this->clues;
  }

  public function setClues(array $clues): static
  {
    $this->clues = $clues;
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
