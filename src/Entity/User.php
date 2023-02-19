<?php

namespace App\Entity;

use App\Repository\UserRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * Class User
 * @package App\Entity
 */
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: 'user')]
#[UniqueEntity('membership_id')]
class User implements UserInterface
{
  public const ROLE_ADMIN = 'ROLE_ADMIN';
  public const ROLE_USER = 'ROLE_USER';

  public const CLASS_TITAN = 0;
  public const CLASS_HUNTER = 1;
  public const CLASS_WARLOCK = 2;
  public const CLASS_UNKNOWN = 3;

  public const GENDER_MALE = 0;
  public const GENDER_FEMALE = 1;
  public const GENDER_UNKNOWN = 2;

  public const RACE_HUMAN = 0;
  public const RACE_AWOKEN = 1;
  public const RACE_EXO = 2;
  public const RACE_UNKNOWN = 3;

  #[ORM\Id]
  #[ORM\GeneratedValue(strategy: 'AUTO')]
  #[ORM\Column]
  private ?int $id;

  #[ORM\Column(length: 255, unique: true)]
  private ?string $membershipId;

  #[ORM\Column]
  private ?string $displayName;

  #[ORM\Column]
  private ?string $emblemPath;

  #[ORM\Column]
  private ?string $emblemBackgroundPath;

  #[ORM\Column]
  private ?int $lightLevel;

  #[ORM\Column]
  private ?int $characterClass = self::CLASS_UNKNOWN;

  #[ORM\Column]
  private ?int $characterGender = self::GENDER_UNKNOWN;

  #[ORM\Column]
  private ?int $characterRace = self::RACE_UNKNOWN;

  #[ORM\Column(nullable: true)]
  private ?DateTime $lastUpdated = null;

  #[ORM\Column(type: 'text')]
  private ?string $accessToken;

  #[ORM\Column(nullable: true)]
  private ?DateTime $accessTokenExpiresAt = null;

  #[ORM\Column(type: 'text')]
  private ?string $refreshToken;

  #[ORM\Column(nullable: true)]
  private ?DateTime $refreshTokenExpiresAt = null;

  #[ORM\Column]
  private bool $admin = false;

  #[ORM\OneToMany(mappedBy: 'user', targetEntity: BountyCompletion::class)]
  private Collection $bountyCompletions;

  public function __construct()
  {
    $this->bountyCompletions = new ArrayCollection();
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getMembershipId(): ?string
  {
    return $this->membershipId;
  }

  public function setMembershipId(string $membershipId): static
  {
    $this->membershipId = $membershipId;
    return $this;
  }

  public function getDisplayName(): ?string
  {
    return $this->displayName;
  }

  public function setDisplayName(string $displayName): static
  {
    $this->displayName = $displayName;
    return $this;
  }

  public function getEmblemPath(): ?string
  {
    return $this->emblemPath;
  }

  public function setEmblemPath(string $emblemPath): static
  {
    $this->emblemPath = $emblemPath;
    return $this;
  }

  public function getEmblemBackgroundPath(): ?string
  {
    return $this->emblemBackgroundPath;
  }

  public function setEmblemBackgroundPath(string $emblemBackgroundPath): static
  {
    $this->emblemBackgroundPath = $emblemBackgroundPath;
    return $this;
  }

  public function getLightLevel(): ?int
  {
    return $this->lightLevel;
  }

  public function setLightLevel(int $lightLevel): static
  {
    $this->lightLevel = $lightLevel;
    return $this;
  }

  public function getCharacterClass(): ?int
  {
    return $this->characterClass;
  }

  public function setCharacterClass(int $characterClass): static
  {
    $this->characterClass = $characterClass;
    return $this;
  }

  public function getCharacterGender(): ?int
  {
    return $this->characterGender;
  }

  public function setCharacterGender(int $characterGender): static
  {
    $this->characterGender = $characterGender;
    return $this;
  }

  public function getCharacterRace(): ?int
  {
    return $this->characterRace;
  }

  public function setCharacterRace(int $characterRace): static
  {
    $this->characterRace = $characterRace;
    return $this;
  }

  public function getLastUpdated(): ?DateTime
  {
    return $this->lastUpdated;
  }

  public function setLastUpdated(DateTime $lastUpdated): static
  {
    $this->lastUpdated = $lastUpdated;
    return $this;
  }

  public function getAccessToken(): ?string
  {
    return $this->accessToken;
  }

  public function setAccessToken(string $accessToken): static
  {
    $this->accessToken = $accessToken;
    return $this;
  }

  public function isAccessTokenExpired(): bool
  {
    return (new DateTime()) >= $this->accessTokenExpiresAt;
  }

  public function getAccessTokenExpiresAt(): ?DateTime
  {
    return $this->accessTokenExpiresAt;
  }

  public function setAccessTokenExpiresAt(DateTime $accessTokenExpiresAt): static
  {
    $this->accessTokenExpiresAt = $accessTokenExpiresAt;
    return $this;
  }

  public function isRefreshTokenExpired(): bool
  {
    return (new DateTime()) >= $this->refreshTokenExpiresAt;
  }

  public function getRefreshToken(): ?string
  {
    return $this->refreshToken;
  }

  public function setRefreshToken(string $refreshToken): static
  {
    $this->refreshToken = $refreshToken;
    return $this;
  }

  public function getRefreshTokenExpiresAt(): ?DateTime
  {
    return $this->refreshTokenExpiresAt;
  }

  public function setRefreshTokenExpiresAt(DateTime $refreshTokenExpiresAt): static
  {
    $this->refreshTokenExpiresAt = $refreshTokenExpiresAt;
    return $this;
  }

  public function isAdmin(): bool
  {
    return $this->admin;
  }

  public function setAdmin(bool $admin): static
  {
    $this->admin = $admin;
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

  public function getRoles(): array
  {
    return [$this->isAdmin() ? self::ROLE_ADMIN : self::ROLE_USER];
  }

  public function getUserIdentifier(): string
  {
    return $this->membershipId;
  }

  public function eraseCredentials(): void
  {
  }
}
