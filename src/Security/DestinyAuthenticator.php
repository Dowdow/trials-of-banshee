<?php

namespace App\Security;

use App\Entity\User;
use App\Exception\DestinyOauthTokensIncompleteException;
use App\Repository\UserRepository;
use App\Service\DestinyAPIClientService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationCredentialsNotFoundException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\RememberMeBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class DestinyAuthenticator extends AbstractAuthenticator
{
  private EntityManagerInterface $em;
  private CsrfTokenManagerInterface $csrfTokenManager;
  private DestinyAPIClientService $destinyApiClient;

  public function __construct(EntityManagerInterface $em, CsrfTokenManagerInterface $csrfTokenManager, DestinyAPIClientService $destinyApiClient)
  {
    $this->em = $em;
    $this->csrfTokenManager = $csrfTokenManager;
    $this->destinyApiClient = $destinyApiClient;
  }

  public function supports(Request $request): ?bool
  {
    return $request->getPathInfo() === '/oauth/callback' && $request->query->has('code') && $request->query->has('state');
  }

  public function authenticate(Request $request): Passport
  {
    $csrfToken = new CsrfToken(DestinyAPIClientService::OAUTH_AUTHORIZE_CSRF, $request->query->get('state'));
    if (!$this->csrfTokenManager->isTokenValid($csrfToken)) {
      throw new AuthenticationException('state is not valid');
    }

    $code = $request->query->get('code');

    $tokens = $this->destinyApiClient->getTokens($code);

    try {
      $this->destinyApiClient->checkOauthData($tokens);
    } catch (DestinyOauthTokensIncompleteException $e) {
      throw new AuthenticationCredentialsNotFoundException($e->getMessage());
    }

    $membershipId = $tokens['membership_id'] ?? null;

    /** @var UserRepository $userRepository */
    $userRepository = $this->em->getRepository(User::class);
    /** @var User|null $user */
    $user = $userRepository->findOneBy(['membershipId' => $membershipId]);
    if ($user === null) {
      $user = new User();
      $this->em->persist($user);
    }

    $this->destinyApiClient->updateUserWithOauthData($user, $tokens);

    $this->em->flush();

    return new SelfValidatingPassport(
      new UserBadge($user->getMembershipId()),
      [
        new RememberMeBadge(),
      ]
    );
  }

  public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
  {
    return null;
  }

  public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
  {
    throw new AccessDeniedHttpException('Your Bungie account is not verified or not valid...');
  }
}
