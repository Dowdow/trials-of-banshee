<?php

namespace App\Command;

use App\Entity\Bounty;
use App\Entity\Weapon;
use App\Exception\CreateBountyException;
use App\Repository\BountyRepository;
use App\Repository\WeaponRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
  name: 'bounty:create',
  description: 'Create every new bounties for the day if they dont alreary exist.',
)]
class BountyCreateCommand extends Command
{
  private EntityManagerInterface $em;
  private LoggerInterface $logger;

  public function __construct(EntityManagerInterface $em, LoggerInterface $logger)
  {
    parent::__construct();
    $this->em = $em;
    $this->logger = $logger;
  }

  protected function configure(): void
  {
    parent::configure();
    $this->addArgument('date', InputArgument::OPTIONAL, 'Date with YYYY-MM-DD format.');
  }

  protected function execute(InputInterface $input, OutputInterface $output): int
  {
    /** @var BountyRepository $bountyRepository */
    $bountyRepository = $this->em->getRepository(Bounty::class);
    /** @var WeaponRepository $weaponRepository */
    $weaponRepository = $this->em->getRepository(Weapon::class);

    $dateArgument = $input->getArgument('date');

    try {
      $date = new DateTime($dateArgument ?? 'now');
    } catch (Exception $e) {
      $this->logger->error($e);
      $output->writeln('Impossible to parse date. Use the YYYY-MM-DD format.');
      return Command::FAILURE;
    }

    $date->setTime(17, 0);
    $output->writeln('Current date is ' . $date->format('d-m-Y H:i'));

    try {
      $this->createBounty($bountyRepository, $weaponRepository, $output, $date, Bounty::TYPE_DAILY, 'Daily');
    } catch (CreateBountyException $e) {
      $this->logger->error($e);
    }
    try {
      $this->createBounty($bountyRepository, $weaponRepository, $output, $date, Bounty::TYPE_ASPIRING, 'Aspiring');
    } catch (CreateBountyException $e) {
      $this->logger->error($e);
    }
    try {
      $this->createBounty($bountyRepository, $weaponRepository, $output, $date, Bounty::TYPE_GUNSMITH, 'Gunsmith');
    } catch (CreateBountyException $e) {
      $this->logger->error($e);
    }

    return Command::SUCCESS;
  }

  /**
   * @throws CreateBountyException
   */
  private function createBounty(
    BountyRepository $bountyRepository,
    WeaponRepository $weaponRepository,
    OutputInterface $output,
    DateTime $date,
    int $type,
    string $name
  ): void
  {
    $output->write('Checking for existing ' . $name . ' bounty... ');

    try {
      $hasBounty = $bountyRepository->hasBountyWithDateStartAndType($date, $type);
    } catch (NoResultException|NonUniqueResultException $e) {
      $this->logger->error($e);
      $hasBounty = true;
    }

    if (!$hasBounty) {
      $output->writeln('Absent');
      $output->write('Creating ' . $name . ' bounty... ');

      try {
        $recommendedWeapons = $weaponRepository->findWeaponsWithSoundAndMinBounties();
      } catch (NoResultException|NonUniqueResultException $e) {
        throw new CreateBountyException($e);
      }

      $weapon = $recommendedWeapons[array_rand($recommendedWeapons)];

      $bounty = new Bounty();
      $bounty->setType($type);
      $bounty->setDateStart($date);
      $bounty->setWeapon($weapon);

      $this->em->persist($bounty);
      $this->em->flush();
      $output->writeln('Done');
    } else {
      $output->writeln('Already created');
    }
  }
}
