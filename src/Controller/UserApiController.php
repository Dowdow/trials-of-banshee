<?php

namespace App\Controller;

use App\Entity\User;
use App\Exception\DestinyOauthTokensExpiredException;
use App\Formatter\UserFormatter;
use App\Service\DestinyAPIClientService;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class UserApiController extends AbstractController
{
  /**
   * @param ManagerRegistry $managerRegistry
   * @param DestinyAPIClientService $destinyAPIClient
   * @param UserFormatter $userFormatter
   * @return JsonResponse
   * @throws Exception
   */
  #[Route('/user', name: 'api.user.get', methods: ['GET'])]
  public function get(ManagerRegistry $managerRegistry, DestinyAPIClientService $destinyAPIClient, UserFormatter $userFormatter): JsonResponse
  {
    if (!$this->isGranted(User::ROLE_USER)) {
      return new JsonResponse(['errors' => ['Not authenticated']], 403);
    }

    /** @var User $user */
    $user = $this->getUser();

    $lastUpdated = $user->getLastUpdated();
    if ($lastUpdated !== null && (new DateTime())->getTimestamp() - $lastUpdated->getTimestamp() < 3600) {
      return new JsonResponse($userFormatter->formatUser($user));
    }

    if ($user->isRefreshTokenExpired()) {
      return new JsonResponse(['errors' => ['Tokens expired']], 419);
    }

    if ($user->isAccessTokenExpired()) {
      try {
        $destinyAPIClient->refreshTokens($user);
      } catch (DestinyOauthTokensExpiredException $e) {
        return new JsonResponse(['errors' => ['Tokens expired']], 419);
      }
    }

    // Getting Destiny Membemship ID and Type
    $membershipData = $destinyAPIClient->getMembershipsForCurrentUser($user)['Response'];

    $destinyMembershipId = null;
    $destinyMembershipType = null;
    $primaryMembershipId = $data['primaryMembershipId'] ?? null;
    if ($primaryMembershipId === null) {
      $destinyMembershipId = $membershipData['destinyMemberships'][0]['membershipId'];
      $destinyMembershipType = $membershipData['destinyMemberships'][0]['membershipType'];
    } else {
      foreach ($membershipData['destinyMemberships'] as $membership) {
        if ($membership['membershipId'] === $primaryMembershipId) {
          $destinyMembershipId = $membership['membershipId'];
          $destinyMembershipType = $membership['membershipType'];
          break;
        }
      }
    }

    // Getting Destiny characters
    $profileData = $destinyAPIClient->getDestiny2Profile($user, $destinyMembershipId, $destinyMembershipType)['Response'];

    $lastedPlayedCharacterId = null;
    $mostRecentDateLastPlayed = null;
    $charactersData = $profileData['characters']['data'] ?? [];
    foreach ($charactersData as $character) {
      $dateLastPlayed = new DateTime($character['dateLastPlayed']);
      if ($lastedPlayedCharacterId === null || $dateLastPlayed > $mostRecentDateLastPlayed) {
        $lastedPlayedCharacterId = $character['characterId'];
        $mostRecentDateLastPlayed = $dateLastPlayed;
      }
    }

    $user
      ->setLastUpdated(new DateTime())
      ->setDisplayName($membershipData['bungieNetUser']['displayName']);
    if ($lastedPlayedCharacterId !== null) {
      $user
        ->setEmblemPath($charactersData[$lastedPlayedCharacterId]['emblemPath'])
        ->setEmblemBackgroundPath($charactersData[$lastedPlayedCharacterId]['emblemBackgroundPath'])
        ->setLightLevel($charactersData[$lastedPlayedCharacterId]['light'])
        ->setCharacterClass($charactersData[$lastedPlayedCharacterId]['classType'])
        ->setCharacterGender($charactersData[$lastedPlayedCharacterId]['genderType'])
        ->setCharacterRace($charactersData[$lastedPlayedCharacterId]['raceType']);
    }

    $em = $managerRegistry->getManager();
    $em->flush();

    return new JsonResponse($userFormatter->formatUser($user));
  }
}
