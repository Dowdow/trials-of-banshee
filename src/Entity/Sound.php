<?php

namespace App\Entity;

use App\Repository\SoundRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Sound
 * @package App\Entity
 */
#[ORM\Entity(repositoryClass: SoundRepository::class)]
#[ORM\Table(name: 'sound')]
class Sound
{
  #[ORM\Id]
  #[ORM\GeneratedValue(strategy: 'AUTO')]
  #[ORM\Column]
  private ?int $id;

  #[ORM\Column(length: 255)]
  private ?string $name = null;

  #[ORM\Column(type: Types::TEXT)]
  private ?string $description = null;

  #[ORM\Column(length: 255)]
  private ?string $path = null;

  #[ORM\ManyToMany(targetEntity: Weapon::class, mappedBy: 'sounds')]
  private Collection $weapons;

  public function __construct()
  {
    $this->weapons = new ArrayCollection();
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getName(): ?string
  {
    return $this->name;
  }

  public function setName(string $name): static
  {
    $this->name = $name;
    return $this;
  }

  public function getDescription(): ?string
  {
    return $this->description;
  }

  public function setDescription(string $description): static
  {
    $this->description = $description;
    return $this;
  }

  public function getPath(): ?string
  {
    return $this->path;
  }

  public function setPath(string $path): static
  {
    $this->path = $path;
    return $this;
  }

  public function hasWeapon(Weapon $weapon): bool
  {
    return $this->weapons->contains($weapon);
  }

  public function addWeapon(Weapon $weapon): static
  {
    if (!$this->weapons->contains($weapon)) {
      $this->weapons->add($weapon);
    }
    return $this;
  }

  public function removeWeapon(Weapon $weapon): static
  {
    if ($this->weapons->contains($weapon)) {
      $this->weapons->removeElement($weapon);
    }
    return $this;
  }

  public function getWeapons(): Collection
  {
    return $this->weapons;
  }

  public function setWeapons(Collection $weapons): static
  {
    $this->weapons = $weapons;
    return $this;
  }
}
