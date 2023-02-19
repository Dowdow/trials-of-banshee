<?php

namespace App\Service;

use App\Entity\User;
use App\Exception\DestinyOauthTokensExpiredException;
use App\Exception\DestinyOauthTokensIncompleteException;
use DateTime;
use Exception;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
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
   */
  private function get(string $path, array $params = []): array
  {
    $url = self::API_ROOT_PATH . $path;
    $response = $this->httpClient->request('GET', $url, [
      'query' => $params,
      'headers' => [
        'X-API-Key' => $this->apiKey,
      ],
    ]);

    return $response->toArray();
  }

  /**
   * @param string $accessToken
   * @param string $path
   * @param array $params
   * @return array
   */
  private function getWithOauth(string $accessToken, string $path, array $params = []): array
  {
    $url = self::API_ROOT_PATH . $path;
    $response = $this->httpClient->request('GET', $url, [
      'auth_bearer' => $accessToken,
      'query' => $params,
      'headers' => [
        'X-API-Key' => $this->apiKey,
      ],
    ]);

    return $response->toArray();
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
   */
  public function getTokens(string $code): array
  {
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
  }

  /**
   * @param User $user
   * @return void
   */
  public function refreshTokens(User $user): void
  {
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

    try {
      $tokens = $response->toArray();
      $this->updateUserWithOauthData($user, $tokens);
    } catch (Exception $e) {
      throw new DestinyOauthTokensExpiredException($e->getMessage());
    }
  }

  /**
   * @param array $tokens
   * @return void
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
   */
  public function getAvailableLocales(): array
  {
    return $this->get('/GetAvailableLocales/');
  }

  /**
   * @return array
   */
  public function getDestinyManifest(): array
  {
    return $this->get('/Destiny2/Manifest/');
  }

  /**
   * @param User $user
   * @return array
   */
  public function getMembershipsForCurrentUser(User $user): array
  {
    return $this->getWithOauth($user->getAccessToken(), '/User/GetMembershipsForCurrentUser/');
  }

  /**
   * @param User $user
   * @param string $destinyMembershipId
   * @param string $destinyMembershipType
   * @return array
   */
  public function getDestiny2Profile(User $user, string $destinyMembershipId, string $destinyMembershipType): array
  {
    return $this->getWithOauth($user->getAccessToken(), "/Destiny2/$destinyMembershipType/Profile/$destinyMembershipId/", [
      'components' => '200'
    ]);
  }
}
