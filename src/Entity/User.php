<?php

namespace App\Entity;

use App\Repository\UserRepository;
use DateTime;
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

  #[ORM\Id]
  #[ORM\GeneratedValue(strategy: 'AUTO')]
  #[ORM\Column]
  private ?int $id;

  #[ORM\Column(length: 255, unique: true)]
  private ?string $membershipId;

  #[ORM\Column(type: 'text')]
  private ?string $accessToken;

  #[ORM\Column]
  private ?DateTime $accessTokenExpiresAt;

  #[ORM\Column(type: 'text')]
  private ?string $refreshToken;

  #[ORM\Column]
  private ?DateTime $refreshTokenExpiresAt;

  #[ORM\Column]
  private bool $admin = false;

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

  public function getAccessToken(): ?string
  {
    return $this->accessToken;
  }

  public function setAccessToken(string $accessToken): static
  {
    $this->accessToken = $accessToken;
    return $this;
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
