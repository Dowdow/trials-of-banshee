<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class DestinyAPIClientService
{
  public const API_ROOT_PATH = 'https://www.bungie.net/Platform';

  private HttpClientInterface $httpClient;
  private string $apiKey;

  /**
   * DestinyAPIClientService constructor.
   * @param string $apiKey
   */
  public function __construct(HttpClientInterface $httpClient, string $apiKey)
  {
    $this->httpClient = $httpClient;
    $this->apiKey = $apiKey;
  }

  /**
   * @param string $path
   * @param array $params
   * @return array
   */
  public function get(string $path, array $params = []): array
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
