<?php

namespace App\Command;

use App\Entity\Bounty;
use App\Entity\Weapon;
use App\Repository\BountyRepository;
use App\Repository\WeaponRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
  name: 'bounty:create',
  description: 'Create every new bounties for the day if they dont alreary exist.',
)]
class BountyCreateCommand extends Command
{
  private EntityManagerInterface $em;

  /**
   * BountyCreateCommand constructor.
   * @param EntityManagerInterface $em
   */
  public function __construct(EntityManagerInterface $em)
  {
    parent::__construct();
    $this->em = $em;
  }

  /**
   * @param InputInterface $input
   * @param OutputInterface $output
   * @return int
   */
  protected function execute(InputInterface $input, OutputInterface $output): int
  {
    /** @var BountyRepository */
    $bountyRepository = $this->em->getRepository(Bounty::class);
    /** @var WeaponRepository */
    $weaponRepository = $this->em->getRepository(Weapon::class);

    $date = new DateTime();
    $date->setTime(17, 0, 0, 0);
    $output->writeln('Current date is ' . $date->format('d-m-Y H:i'));

    $output->write('Checking for existing daily bounty... ');
    $hasDailyBounty = $bountyRepository->hasBountyWithDateStartAndType($date, Bounty::TYPE_DAILY);
    if (!$hasDailyBounty) {
      $output->writeln('Absent');
      $output->write('Creating daily Bounty... ');
      $recommendedWeapons = $weaponRepository->findWeaponsWithSoundAndMinBounties();
      $weapon = $recommendedWeapons[array_rand($recommendedWeapons)][0];

      $bounty = new Bounty();
      $bounty->setType(Bounty::TYPE_DAILY);
      $bounty->setDateStart($date);
      $bounty->setWeapon($weapon);

      $this->em->persist($bounty);
      $this->em->flush();
      $output->writeln('Done');
    } else {
      $output->writeln('Already created');
    }

    return Command::SUCCESS;
  }
}
