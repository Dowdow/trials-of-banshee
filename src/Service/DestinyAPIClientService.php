<?php

namespace App\Service;

use App\Entity\User;
use App\Exception\DestinyClient\DestinyGetAvailableLocalesException;
use App\Exception\DestinyClient\DestinyGetDestiny2ProfileException;
use App\Exception\DestinyClient\DestinyGetDestinyManifestException;
use App\Exception\DestinyClient\DestinyGetException;
use App\Exception\DestinyClient\DestinyGetMembershipsForCurrentUserException;
use App\Exception\DestinyClient\DestinyGetWithOauthException;
use App\Exception\DestinyClient\DestinyOauthTokensException;
use App\Exception\DestinyClient\DestinyOauthTokensExpiredException;
use App\Exception\DestinyClient\DestinyOauthTokensIncompleteException;
use DateTime;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class DestinyAPIClientService
{
  public const API_ROOT_PATH = 'https://www.bungie.net/Platform';
  public const OAUTH_AUTHORIZE_URL = 'https://www.bungie.net/en/oauth/authorize';
  public const OAUTH_TOKEN_URL = 'https://www.bungie.net/platform/app/oauth/token/';
  public const OAUTH_AUTHORIZE_CSRF = 'OAUTH_AUTHORIZE_CSRF';

  private HttpClientInterface $httpClient;
  private CsrfTokenManagerInterface $csrfTokenManager;
  private string $apiKey;
  private string $oauthClientId;
  private string $oauthClientSecret;

  /**
   * DestinyAPIClientService constructor.
   * @param HttpClientInterface $httpClient
   * @param CsrfTokenManagerInterface $csrfTokenManager
   * @param string $apiKey
   * @param string $oauthClientId
   * @param string $oauthClientSecret
   */
  public function __construct(HttpClientInterface $httpClient, CsrfTokenManagerInterface $csrfTokenManager, string $apiKey, string $oauthClientId, string $oauthClientSecret)
  {
    $this->httpClient = $httpClient;
    $this->csrfTokenManager = $csrfTokenManager;
    $this->apiKey = $apiKey;
    $this->oauthClientId = $oauthClientId;
    $this->oauthClientSecret = $oauthClientSecret;
  }

  /**
   * @param string $path
   * @param array $params
   * @return array
   * @throws DestinyGetException
   */
  private function get(string $path, array $params = []): array
  {
    $url = self::API_ROOT_PATH . $path;
    try {
      $response = $this->httpClient->request('GET', $url, [
        'query' => $params,
        'headers' => [
          'X-API-Key' => $this->apiKey,
        ],
      ]);
      return $response->toArray();
    } catch (TransportExceptionInterface|ClientExceptionInterface|DecodingExceptionInterface|RedirectionExceptionInterface|ServerExceptionInterface $e) {
      throw new DestinyGetException($e);
    }
  }

  /**
   * @param string $accessToken
   * @param string $path
   * @param array $params
   * @return array
   * @throws DestinyGetWithOauthException
   */
  private function getWithOauth(string $accessToken, string $path, array $params = []): array
  {
    $url = self::API_ROOT_PATH . $path;
    try {
      $response = $this->httpClient->request('GET', $url, [
        'auth_bearer' => $accessToken,
        'query' => $params,
        'headers' => [
          'X-API-Key' => $this->apiKey,
        ],
      ]);
      return $response->toArray();
    } catch (TransportExceptionInterface|ClientExceptionInterface|DecodingExceptionInterface|RedirectionExceptionInterface|ServerExceptionInterface $e) {
      throw new DestinyGetWithOauthException($e);
    }
  }

  /**
   * @return string
   */
  public function getAuthorizationUrl(): string
  {
    return self::OAUTH_AUTHORIZE_URL
      . '?client_id=' . $this->oauthClientId
      . '&response_type=code'
      . '&state=' . $this->csrfTokenManager->refreshToken(self::OAUTH_AUTHORIZE_CSRF)->getValue();
  }

  /**
   * @param string $code
   * @return array
   * @throws DestinyOauthTokensException
   */
  public function getTokens(string $code): array
  {
    try {
      $response = $this->httpClient->request('POST', self::OAUTH_TOKEN_URL, [
        'auth_basic' => [$this->oauthClientId, $this->oauthClientSecret],
        'headers' => [
          'Content-Type' => 'application/x-www-form-urlencoded',
        ],
        'body' => [
          'grant_type' => 'authorization_code',
          'code' => $code,
        ],
      ]);
      return $response->toArray();
    } catch (TransportExceptionInterface|ClientExceptionInterface|DecodingExceptionInterface|RedirectionExceptionInterface|ServerExceptionInterface $e) {
      throw new DestinyOauthTokensException($e);
    }
  }

  /**
   * @param User $user
   * @return void
   * @throws DestinyOauthTokensExpiredException
   */
  public function refreshTokens(User $user): void
  {
    try {
      $response = $this->httpClient->request('POST', self::OAUTH_TOKEN_URL, [
        'auth_basic' => [$this->oauthClientId, $this->oauthClientSecret],
        'headers' => [
          'Content-Type' => 'application/x-www-form-urlencoded',
        ],
        'body' => [
          'grant_type' => 'refresh_token',
          'refresh_token' => $user->getRefreshToken(),
        ],
      ]);
      $tokens = $response->toArray();
      $this->updateUserWithOauthData($user, $tokens);
    } catch (TransportExceptionInterface|ClientExceptionInterface|ServerExceptionInterface|RedirectionExceptionInterface|DecodingExceptionInterface|DestinyOauthTokensIncompleteException $e) {
      throw new DestinyOauthTokensExpiredException($e->getMessage());
    }
  }

  /**
   * @param array $tokens
   * @return void
   * @throws DestinyOauthTokensIncompleteException
   */
  public function checkOauthData(array $tokens): void
  {
    $accessToken = $tokens['access_token'] ?? null;
    $accessTokenExpiresAt = $tokens['expires_in'] ?? null;
    $refreshToken = $tokens['refresh_token'] ?? null;
    $refreshTokenExpiresAt = $tokens['refresh_expires_in'] ?? null;
    $membershipId = $tokens['membership_id'] ?? null;

    if ($accessToken === null || $accessTokenExpiresAt === null || $refreshToken === null || $refreshTokenExpiresAt === null || $membershipId === null) {
      throw new DestinyOauthTokensIncompleteException();
    }
  }

  /**
   * @param User $user
   * @param array $tokens
   * @return void
   * @throws DestinyOauthTokensIncompleteException
   */
  public function updateUserWithOauthData(User $user, array $tokens): void
  {
    $this->checkOauthData($tokens);

    $accessToken = $tokens['access_token'] ?? null;
    $accessTokenExpiresAt = $tokens['expires_in'] ?? null;
    $refreshToken = $tokens['refresh_token'] ?? null;
    $refreshTokenExpiresAt = $tokens['refresh_expires_in'] ?? null;
    $membershipId = $tokens['membership_id'] ?? null;

    $date = new DateTime();
    $user
      ->setMembershipId($membershipId)
      ->setAccessToken($accessToken)
      ->setAccessTokenExpiresAt((clone $date)->modify("+$accessTokenExpiresAt seconds"))
      ->setRefreshToken($refreshToken)
      ->setRefreshTokenExpiresAt((clone $date)->modify("+$refreshTokenExpiresAt seconds"));
  }

  /**
   * @return array
   * @throws DestinyGetAvailableLocalesException
   */
  public function getAvailableLocales(): array
  {
    try {
      return $this->get('/GetAvailableLocales/');
    } catch (DestinyGetException $e) {
      throw new DestinyGetAvailableLocalesException($e);
    }
  }

  /**
   * @return array
   * @throws DestinyGetDestinyManifestException
   */
  public function getDestinyManifest(): array
  {
    try {
      return $this->get('/Destiny2/Manifest/');
    } catch (DestinyGetException $e) {
      throw new DestinyGetDestinyManifestException($e);
    }
  }

  /**
   * @param User $user
   * @return array
   * @throws DestinyGetMembershipsForCurrentUserException
   */
  public function getMembershipsForCurrentUser(User $user): array
  {
    try {
      return $this->getWithOauth($user->getAccessToken(), '/User/GetMembershipsForCurrentUser/');
    } catch (DestinyGetWithOauthException $e) {
      throw new DestinyGetMembershipsForCurrentUserException($e);
    }
  }

  /**
   * @param User $user
   * @param string $destinyMembershipId
   * @param string $destinyMembershipType
   * @return array
   * @throws DestinyGetDestiny2ProfileException
   */
  public function getDestiny2Profile(User $user, string $destinyMembershipId, string $destinyMembershipType): array
  {
    try {
      return $this->getWithOauth($user->getAccessToken(), "/Destiny2/$destinyMembershipType/Profile/$destinyMembershipId/", [
        'components' => '200'
      ]);
    } catch (DestinyGetWithOauthException $e) {
      throw new DestinyGetDestiny2ProfileException($e);
    }
  }
}
