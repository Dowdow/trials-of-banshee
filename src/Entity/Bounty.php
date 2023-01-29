<?php

namespace App\Entity;

use App\Repository\BountyRepository;
use DateTime;
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

  #[ORM\Id]
  #[ORM\GeneratedValue(strategy: 'AUTO')]
  #[ORM\Column]
  private ?int $id;

  #[ORM\Column]
  private ?int $type = null;

  #[ORM\Column]
  private ?DateTime $dateStart = null;

  #[ORM\ManyToOne(targetEntity: Weapon::class, inversedBy: 'bounties')]
  private ?Weapon $weapon = null;

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

  public function getWeapon(): ?Weapon
  {
    return $this->weapon;
  }

  public function setWeapon(Weapon $weapon): static
  {
    $this->weapon = $weapon;
    return $this;
  }
}
