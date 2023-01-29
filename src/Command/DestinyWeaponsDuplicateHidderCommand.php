<?php

namespace App\Command;

use App\Entity\Weapon;
use App\Repository\WeaponRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
  name: 'destiny:weapons:hide',
  description: 'Hide duplicate weapons in the database.',
)]
class DestinyWeaponsDuplicateHidderCommand extends Command
{
  public const HIDDEN_KEYWORDS = ['(Adept)', '(Timelost)', '(Harrowed)', '(Damaged)', '(Baroque)', 'v1.0.1', 'v1.0.2'];

  private EntityManagerInterface $em;

  /**
   * DestinyWeaponsDuplicateHidderCommand constructor.
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
    $output->write('Retrieving all weapons... ');
    /** @var WeaponRepository */
    $weaponRepository = $this->em->getRepository(Weapon::class);
    $weapons = $weaponRepository->findAll();
    $output->writeln('Done');

    foreach ($weapons as $weapon1) {
      // Check for (Adept) etc
      if ($this->contains($weapon1->getNames()['en'], self::HIDDEN_KEYWORDS)) {
        $weapon1->setHidden(true);
        continue;
      }
      // Keep the one with the greatest id
      foreach ($weapons as $weapon2) {
        $id1 = $weapon1->getId();
        $id2 = $weapon2->getId();
        if ($id1 === $id2) continue;
        if ($weapon1->getNames()['en'] === $weapon2->getNames()['en']) {
          if ($id1 > $id2) {
            $weapon2->setHidden(true);
          } else {
            $weapon1->setHidden(true);
          }
        }
      }
    }

    $this->em->flush();

    return Command::SUCCESS;
  }

  /**
   * @param string $haystack
   * @param array $needles
   * @return bool
   */
  private function contains(string $haystack, array $needles): bool
  {
    foreach ($needles as $n) {
      if (str_contains($haystack, $n)) return true;
    }
    return false;
  }
}
