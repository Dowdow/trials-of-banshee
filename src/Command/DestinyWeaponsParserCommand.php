<?php

namespace App\Command;

use App\Entity\Weapon;
use App\Exception\DestinyClient\DestinyGetAvailableLocalesException;
use App\Service\DestinyAPIClientService;
use Doctrine\ORM\EntityManagerInterface;
use JsonException;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
  name: 'destiny:weapons:parser',
  description: 'Parse cached json data for weapons and store them in the database.',
)]
class DestinyWeaponsParserCommand extends Command
{
  public const WEAPON_ITEM_TYPE = 3;

  private EntityManagerInterface $em;
  private DestinyAPIClientService $destinyAPIClient;
  private string $d2CacheFolder;

  /**
   * DestinyDataCachingCommand constructor.
   * @param EntityManagerInterface $em
   * @param DestinyAPIClientService $destinyAPIClient
   * @param string $d2CacheFolder
   */
  public function __construct(EntityManagerInterface $em, DestinyAPIClientService $destinyAPIClient, string $d2CacheFolder)
  {
    parent::__construct();
    $this->em = $em;
    $this->destinyAPIClient = $destinyAPIClient;
    $this->d2CacheFolder = $d2CacheFolder;
  }

  /**
   * @param InputInterface $input
   * @param OutputInterface $output
   * @return int
   */
  protected function execute(InputInterface $input, OutputInterface $output): int
  {
    $output->write('Retrieving Destiny available locales... ');
    try {
      $locales = $this->destinyAPIClient->getAvailableLocales()['Response'];
    } catch (DestinyGetAvailableLocalesException $e) {
      // TODO Log Exception
      $output->writeln('Unable to get Destiny available locales. Exiting...');
      return Command::FAILURE;
    }
    $output->writeln('Done');

    // Extract only usefull data from cached json
    $parsedItems = [];
    foreach ($locales as $locale) {
      $output->write('Parsing "' . $locale . '" items... ');
      try {
        $items = json_decode(file_get_contents($this->d2CacheFolder . '/' . $locale . '.json'), true, 512, JSON_THROW_ON_ERROR);
      } catch (JsonException $e) {
        // TODO Log Exception
        $items = [];
      }
      foreach ($items as $item) {
        if ($item['itemType'] !== self::WEAPON_ITEM_TYPE) {
          continue;
        }

        if (isset($parsedItems[$item['hash']])) {
          $parsedItems[$item['hash']]['names'][$locale] = $item['displayProperties']['name'];
          continue;
        }

        $parsedItems[$item['hash']] = [
          'hash' => $item['hash'],
          'names' => [
            $locale => $item['displayProperties']['name'],
          ],
          'icon' => $item['displayProperties']['icon'],
          'screenshot' => $item['screenshot'],
          'type' => $item['itemSubType'],
          'damageType' => $item['defaultDamageType'],
          'rarity' => $item['inventory']['tierType'],
        ];
      }
      unset($items);
      $output->writeln("Done $locale");
    }

    // Update existing weapons
    $weapons = $this->em->getRepository(Weapon::class)->findAll();
    $output->write('Updating ' . count($weapons) . ' weapons... ');
    foreach ($weapons as $weapon) {
      $hash = $weapon->getHash();
      if (array_key_exists($hash, $parsedItems)) {
        $weapon->setNames($parsedItems[$hash]['names']);
        $weapon->setIcon($parsedItems[$hash]['icon']);
        $weapon->setScreenshot($parsedItems[$hash]['screenshot']);
        $weapon->setType($parsedItems[$hash]['type']);
        $weapon->setDamageType($parsedItems[$hash]['damageType']);
        $weapon->setRarity($parsedItems[$hash]['rarity']);
        unset($parsedItems[$hash]);
      }
    }
    $output->writeln('Done');

    // Add new weapons
    $output->write('Adding ' . count($parsedItems) . ' new weapons... ');
    foreach ($parsedItems as $item) {
      $weapon = new Weapon();
      $weapon
        ->setHash($item['hash'])
        ->setNames($item['names'])
        ->setIcon($item['icon'])
        ->setScreenshot($item['screenshot'])
        ->setType($item['type'])
        ->setDamageType($item['damageType'])
        ->setRarity($item['rarity']);

      $this->em->persist($weapon);
    }
    $output->writeln('Done');

    $this->em->flush();

    return Command::SUCCESS;
  }
}
