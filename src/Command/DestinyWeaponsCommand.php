<?php

namespace App\Command;

use App\Service\DestinyAPIClientService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
  name: 'destiny:weapons',
  description: 'Retrieves all weapons from the Destiny API and store them in the database.',
)]
class DestinyWeaponsCommand extends Command
{
  private EntityManagerInterface $em;
  private DestinyAPIClientService $destinyAPIClientService;

  /**
   * DestinyWeaponsCommand constructor.
   * @param EntityManagerInterface $em
   * @param DestinyAPIClientService $destinyAPIClientService
   */
  public function __construct(EntityManagerInterface $em, DestinyAPIClientService $destinyAPIClientService)
  {
    parent::__construct();
    $this->em = $em;
    $this->destinyAPIClientService = $destinyAPIClientService;
  }

  /**
   * @param InputInterface $input
   * @param OutputInterface $output
   * @return int
   */
  protected function execute(InputInterface $input, OutputInterface $output): int
  {
    //$availableLocales = $this->destinyAPIClientService->getAvailableLocales();
    $destinyManifest = $this->destinyAPIClientService->getDestinyManifest()['Response'];
    $version = $destinyManifest['version'];

    // Si la version est similaire on prend depuis le tmp

    // Si la version est différente on clean le tmp et on dl tout


    $jsonWorldComponentContentPaths = $destinyManifest['jsonWorldComponentContentPaths'];

    foreach ($jsonWorldComponentContentPaths as $lang => $path) {
      $output->writeln('Downloading "' . $lang . '" at [https://bungie.net' . $path['DestinyInventoryItemDefinition'] . ']');
      $data = file_get_contents('https://bungie.net' . $path['DestinyInventoryItemDefinition']);
      $output->writeln('Done');

      $json = json_decode($data);
      unset($data);

      foreach ($json as $item) {
        dump($item);
        break;
      }
      break;
    }

    return Command::SUCCESS;
  }
}
