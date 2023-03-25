<?php

namespace App\Command;

use App\Exception\DestinyClient\DestinyGetDestinyManifestException;
use App\Service\DestinyAPIClientService;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Filesystem;

#[AsCommand(
  name: 'destiny:data:cache',
  description: 'Retrieves data from the Destiny Manifest and cache it for future use.',
)]
class DestinyDataCachingCommand extends Command
{
  private DestinyAPIClientService $destinyAPIClient;
  private LoggerInterface $logger;
  private string $d2CacheFolder;

  public function __construct(
    DestinyAPIClientService $destinyAPIClient,
    LoggerInterface $logger,
    string $d2CacheFolder
  )
  {
    parent::__construct();
    $this->destinyAPIClient = $destinyAPIClient;
    $this->logger = $logger;
    $this->d2CacheFolder = $d2CacheFolder;
  }

  /**
   * @param InputInterface $input
   * @param OutputInterface $output
   * @return int
   */
  protected function execute(InputInterface $input, OutputInterface $output): int
  {
    $d2CacheVersionFile = $this->d2CacheFolder . '/version.txt';
    $filesystem = new Filesystem();

    $output->write('Downloading Destiny Manifest... ');
    try {
      $destinyManifest = $this->destinyAPIClient->getDestinyManifest()['Response'];
    } catch (DestinyGetDestinyManifestException $e) {
      $this->logger->error($e);
      $output->writeln('Error while trying to get the Destiny Manifest file. Exiting...');
      return Command::FAILURE;
    }
    $output->writeln('Done');

    $manifestVersion = $destinyManifest['version'];
    $cacheVersion = false;
    if ($filesystem->exists($d2CacheVersionFile)) {
      $cacheVersion = file_get_contents($d2CacheVersionFile);
    }

    if ($manifestVersion === $cacheVersion) {
      $output->writeln('Cache already up to date');
      return Command::SUCCESS;
    }

    $output->writeln('New version available ' . $manifestVersion);

    $jsonWorldComponentContentPaths = $destinyManifest['jsonWorldComponentContentPaths'];
    foreach ($jsonWorldComponentContentPaths as $lang => $path) {
      $output->write('Downloading "' . $lang . '" at [https://bungie.net' . $path['DestinyInventoryItemDefinition'] . ']... ');
      $data = file_get_contents('https://bungie.net' . $path['DestinyInventoryItemDefinition']);
      file_put_contents($this->d2CacheFolder . '/' . $lang . '.json', $data);
      unset($data);
      $output->writeln("Done $lang");
    }

    $output->write('Caching version file... ');
    file_put_contents($d2CacheVersionFile, $manifestVersion);
    $output->writeln('Done');

    return Command::SUCCESS;
  }
}
