<?php

namespace App\Entity;

use App\Repository\WeaponRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * Class Weapon
 * @package App\Entity
 */
#[ORM\Entity(repositoryClass: WeaponRepository::class)]
#[ORM\Table(name: 'weapon')]
#[UniqueEntity('destiny_hash')]
class Weapon
{
  public const TYPE_AUTO = 6;
  public const TYPE_SHOTGUN = 7;
  public const TYPE_MACHINEGUN = 8;
  public const TYPE_HAND_CANNON = 9;
  public const TYPE_ROCKET_LAUNCHER = 10;
  public const TYPE_FUSION = 11;
  public const TYPE_SNIPER = 12;
  public const TYPE_PULSE = 13;
  public const TYPE_SCOUT = 14;
  public const TYPE_SIDEARM = 17;
  public const TYPE_SWORD = 18;
  public const TYPE_LINEAR_FUSION = 22;
  public const TYPE_GRENADE_LAUNCHER = 23;
  public const TYPE_SUBMACHINE_GUN = 24;
  public const TYPE_TRACE = 25;
  public const TYPE_BOW = 31;
  public const TYPE_GLAIVE = 33;

  public const DAMAGE_TYPE_KINETIC = 1;
  public const DAMAGE_TYPE_ARC = 2;
  public const DAMAGE_TYPE_SOLAR = 3;
  public const DAMAGE_TYPE_VOID = 4;
  public const DAMAGE_TYPE_STASIS = 6;

  public const RARITY_BASIC = 2;
  public const RARITY_COMMON = 3;
  public const RARITY_RARE = 4;
  public const RARITY_LEGENDARY = 5;
  public const RARITY_EXOTIC = 6;

  #[ORM\Id]
  #[ORM\GeneratedValue(strategy: 'AUTO')]
  #[ORM\Column]
  private ?int $id = null;

  #[ORM\Column(name: 'destiny_hash', length: 255, unique: true)]
  private ?string $hash = null;

  #[ORM\Column(type: Types::JSON)]
  private array $names = [];

  #[ORM\Column(name: 'weapon_type')]
  private ?int $type = null;

  #[ORM\Column]
  private ?int $damageType = null;

  #[ORM\Column]
  private ?int $rarity = null;

  #[ORM\Column(length: 255)]
  private ?string $icon = null;

  #[ORM\Column(length: 255)]
  private ?string $screenshot = null;

  #[ORM\Column]
  private bool $hidden = false;

  #[ORM\ManyToMany(targetEntity: Sound::class, mappedBy: 'weapons')]
  private Collection $sounds;

  public function __construct()
  {
    $this->sounds = new ArrayCollection();
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getHash(): ?string
  {
    return $this->hash;
  }

  public function setHash(string $hash): static
  {
    $this->hash = $hash;
    return $this;
  }

  public function getNames(): array
  {
    return $this->names;
  }

  public function setNames(array $names): static
  {
    $this->names = $names;
    return $this;
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

  public function getDamageType(): ?int
  {
    return $this->damageType;
  }

  public function setDamageType(int $damageType): static
  {
    $this->damageType = $damageType;
    return $this;
  }

  public function getRarity(): ?int
  {
    return $this->rarity;
  }

  public function setRarity(int $rarity): static
  {
    $this->rarity = $rarity;
    return $this;
  }

  public function getIcon(): ?string
  {
    return $this->icon;
  }

  public function setIcon(string $icon): static
  {
    $this->icon = $icon;
    return $this;
  }

  public function getScreenshot(): ?string
  {
    return $this->screenshot;
  }

  public function setScreenshot(string $screenshot): static
  {
    $this->screenshot = $screenshot;
    return $this;
  }

  public function isHidden(): bool
  {
    return $this->hidden;
  }

  public function setHidden(bool $hidden): static
  {
    $this->hidden = $hidden;
    return $this;
  }

  public function hasSound(Sound $sound): bool
  {
    return $this->sounds->contains($sound);
  }

  public function getSounds(): Collection
  {
    return $this->sounds;
  }

  public function addSound(Sound $sound): static
  {
    if (!$this->sounds->contains($sound)) {
      $this->sounds->add($sound);
      $sound->addWeapon($this);
    }
    return $this;
  }

  public function removeSound(Sound $sound): static
  {
    if ($this->sounds->contains($sound)) {
      $this->sounds->removeElement($sound);
      $sound->removeWeapon($this);
    }
    return $this;
  }

  public function setSounds(Collection $sounds): static
  {
    $this->sounds = $sounds;
    return $this;
  }
}
