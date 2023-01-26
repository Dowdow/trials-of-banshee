<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class Weapon
 * @package App\Entity
 *
 * @ORM\Table(name="weapon",uniqueConstraints={
 *     @ORM\UniqueConstraint(name="destiny_hash_idx", columns={"destiny_hash"})
 * })
 * @ORM\Entity(repositoryClass="App\Repository\WeaponRepository")
 */
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

  /**
   * @var int|null
   *
   * @ORM\Column(name="id", type="integer")
   * @ORM\Id
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  private ?int $id;

  /**
   * @ORM\Column(name="destiny_hash", type="string", nullable=false)
   */
  private string $hash;

  /**
   * @ORM\Column(name="names", type="json", nullable=false)
   */
  private array $names = [];

  /**
   * @ORM\Column(name="weapon_type", type="integer", nullable=false)
   */
  private int $type;

  /**
   * @ORM\Column(name="damage_type", type="integer", nullable=false)
   */
  private int $damageType;

  /**
   * @ORM\Column(name="rarity", type="integer", nullable=false)
   */
  private int $rarity;

  /**
   * @ORM\Column(name="icon", type="string", nullable=false)
   */
  private string $icon;

  /**
   * @ORM\Column(name="screenshot", type="string", nullable=false)
   */
  private string $screenshot;

  /**
   * @return int|null
   */
  public function getId(): ?int
  {
    return $this->id;
  }

  /**
   * @return string
   */
  public function getHash(): string
  {
    return $this->hash;
  }

  /**
   * @param string $hash
   * @return $this
   */
  public function setHash(string $hash): static
  {
    $this->hash = $hash;
    return $this;
  }

  /**
   * @return array
   */
  public function getNames(): array
  {
    return $this->names;
  }

  /**
   * @param array $names
   * @return $this
   */
  public function setNames(array $names): static
  {
    $this->names = $names;
    return $this;
  }

  /**
   * @return int
   */
  public function getType(): int
  {
    return $this->type;
  }

  /**
   * @param int $type
   * @return $this
   */
  public function setType(int $type): static
  {
    $this->type = $type;
    return $this;
  }

  /**
   * @return int
   */
  public function getDamageType(): int
  {
    return $this->damageType;
  }

  /**
   * @param int $damageType
   * @return $this
   */
  public function setDamageType(int $damageType): static
  {
    $this->damageType = $damageType;
    return $this;
  }

  /**
   * @return int
   */
  public function getRarity(): int
  {
    return $this->rarity;
  }

  /**
   * @param int $rarity
   * @return $this
   */
  public function setRarity(int $rarity): static
  {
    $this->rarity = $rarity;
    return $this;
  }

  /**
   * @return string
   */
  public function getIcon(): string
  {
    return $this->icon;
  }

  /**
   * @param string $icon
   * @return $this
   */
  public function setIcon(string $icon): static
  {
    $this->icon = $icon;
    return $this;
  }

  /**
   * @return string
   */
  public function getScreenshot(): string
  {
    return $this->screenshot;
  }

  /**
   * @param string $screenshot
   * @return $this
   */
  public function setScreenshot(string $screenshot): static
  {
    $this->screenshot = $screenshot;
    return $this;
  }
}
