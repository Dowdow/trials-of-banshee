<?php

namespace App\Entity;

use App\Repository\BountyRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Bounty
 * @package App\Entity
 */
#[ORM\Entity(repositoryClass: BountyRepository::class)]
#[ORM\Table(name: 'bounty')]
class Bounty
{
  public const TYPE_DAILY = 0;
  public const TYPE_ASPIRING = 1;
  public const TYPE_GUNSMITH = 2;

  #[ORM\Id]
  #[ORM\GeneratedValue(strategy: 'AUTO')]
  #[ORM\Column]
  private ?int $id;

  #[ORM\Column]
  private ?int $type = null;

  #[ORM\Column]
  private ?DateTime $dateStart = null;

  #[ORM\Column]
  private int $offlineCompletions = 0;

  #[ORM\ManyToOne(targetEntity: Weapon::class, inversedBy: 'bounties')]
  private ?Weapon $weapon = null;

  #[ORM\OneToMany(mappedBy: 'bounty', targetEntity: BountyCompletion::class)]
  private Collection $bountyCompletions;

  public function __construct()
  {
    $this->bountyCompletions = new ArrayCollection();
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getType(): ?int
  {
    return $this->type;
  }

  public function setType(int $type): static
  {
    $this->type = $type;
    return $this;
  }

  public function getDateStart(): ?DateTime
  {
    return $this->dateStart;
  }

  public function setDateStart(DateTime $dateStart): static
  {
    $this->dateStart = $dateStart;
    return $this;
  }

  public function getOfflineCompletions(): int
  {
    return $this->offlineCompletions;
  }

  public function setOfflineCompletions(int $offlineCompletions): static
  {
    $this->offlineCompletions = $offlineCompletions;
    return $this;
  }

  public function getWeapon(): ?Weapon
  {
    return $this->weapon;
  }

  public function setWeapon(Weapon $weapon): static
  {
    $this->weapon = $weapon;
    return $this;
  }

  public function getBountyCompletions(): Collection
  {
    return $this->bountyCompletions;
  }

  public function setBountyCompletions(Collection $bountyCompletions): static
  {
    $this->bountyCompletions = $bountyCompletions;
    return $this;
  }
}
