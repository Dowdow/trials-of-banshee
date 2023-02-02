<?php

namespace App\Service;

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
   * @param string $refreshToken
   * @return array
   */
  public function refreshTokens(string $refreshToken): array
  {
    $response = $this->httpClient->request('POST', self::OAUTH_TOKEN_URL, [
      'auth_basic' => [$this->oauthClientId, $this->oauthClientSecret],
      'headers' => [
        'Content-Type' => 'application/x-www-form-urlencoded',
      ],
      'body' => [
        'grant_type' => 'refresh_token',
        'refresh_token' => $refreshToken,
      ],
    ]);

    return $response->toArray();
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
}
