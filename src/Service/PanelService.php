<?php

namespace App\Service;

use App\Entity\Weapon;
use App\Exception\DestinyClient\DestinyGetAvailableLocalesException;
use App\Exception\DestinyClient\DestinyGetDestinyManifestException;
use App\Repository\WeaponRepository;
use Doctrine\ORM\EntityManagerInterface;
use JsonException;
use Psr\Log\LoggerInterface;
use SplFileObject;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Process\Process;

class PanelService
{
  public const WEAPON_ITEM_TYPE = 3;
  public const DEFAULT_ICON_WATERMARK = '/common/destiny2_content/icons/0dac2f181f0245cfc64494eccb7db9f7.png';
  public const HIDDEN_KEYWORDS = [
    '(Adept)',
    '(Timelost)',
    '(Harrowed)',
    '(Damaged)',
    '(Baroque)',
    'v1.0.1',
    'v1.0.2'
  ];


  private DestinyAPIClientService $destinyAPIClient;
  private EntityManagerInterface $em;
  private LoggerInterface $logger;
  private string $d2CacheFolder;
  private string $jqPath;

  public function __construct(
    DestinyAPIClientService $destinyAPIClient,
    EntityManagerInterface $em,
    LoggerInterface $logger,
    string $d2CacheFolder,
    string $jqPath
  )
  {
    $this->destinyAPIClient = $destinyAPIClient;
    $this->em = $em;
    $this->logger = $logger;
    $this->d2CacheFolder = $d2CacheFolder;
    $this->jqPath = $jqPath;
  }

  public function destinyWeaponsCache(): bool|iterable
  {
    $d2CacheVersionFile = $this->d2CacheFolder . '/version.txt';
    $filesystem = new Filesystem();

    yield 'Downloading Destiny Manifest... ';

    try {
      $destinyManifest = $this->destinyAPIClient->getDestinyManifest()['Response'];
    } catch (DestinyGetDestinyManifestException $e) {
      $this->logger->error($e);
      yield 'Error while trying to get the Destiny Manifest file. Exiting...';
      return false;
    }
    yield 'Done';

    $manifestVersion = $destinyManifest['version'];
    $cacheVersion = false;
    if ($filesystem->exists($d2CacheVersionFile)) {
      $cacheVersion = file_get_contents($d2CacheVersionFile);
    }

    if ($manifestVersion === $cacheVersion) {
      yield 'Cache already up to date';
      return true;
    }

    yield "New version available $manifestVersion";

    $jsonWorldComponentContentPaths = $destinyManifest['jsonWorldComponentContentPaths'];
    foreach ($jsonWorldComponentContentPaths as $lang => $path) {
      $saveFile = $this->d2CacheFolder . DIRECTORY_SEPARATOR . "$lang.json";
      $saveFileJq = $this->d2CacheFolder . DIRECTORY_SEPARATOR . $lang . '_jq.json';
      $jsonPath = 'https://bungie.net' . $path['DestinyInventoryItemDefinition'];

      yield "Downloading '$lang' at [$jsonPath]... ";

      $wget = new Process(['wget', $jsonPath, '-O', $saveFile]);
      $wget->setTimeout(300);
      $wget->run();
      if (!$wget->isSuccessful()) {
        yield $wget->getErrorOutput();
      }

      yield "Done dl $lang";
      yield "jq '$lang' to $saveFileJq";

      $jq = Process::fromShellCommandline($this->jqPath . " -c '.[] | select(.itemType==" . self::WEAPON_ITEM_TYPE . ")' " . $saveFile . ' > ' . $saveFileJq);
      $jq->run();
      if (!$jq->isSuccessful()) {
        yield $jq->getErrorOutput();
      }

      yield "Done jq $lang";
    }

    yield 'Caching version file... ';
    file_put_contents($d2CacheVersionFile, $manifestVersion);
    yield 'Done';

    return true;
  }

  public function destinyWeaponsParse(): bool|iterable
  {
    yield 'Retrieving Destiny available locales... ';
    try {
      $locales = $this->destinyAPIClient->getAvailableLocales()['Response'];
    } catch (DestinyGetAvailableLocalesException $e) {
      $this->logger->error($e);
      yield 'Unable to get Destiny available locales. Exiting...';
      return false;
    }
    yield 'Done';

    // Extract only usefull data from cached json
    $parsedItems = [];
    foreach ($locales as $locale) {
      yield "Parsing '$locale' items... ";

      $file = new SplFileObject($this->d2CacheFolder . DIRECTORY_SEPARATOR . $locale . '_jq.json');

      while (!$file->eof()) {
        $line = $file->fgets();
        if (trim($line) === '') {
          continue;
        }

        try {
          $item = json_decode($line, true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
          $this->logger->error($e);
          continue;
        }

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
          'iconWatermark' => $item['iconWatermark'] ?? self::DEFAULT_ICON_WATERMARK,
          'screenshot' => $item['screenshot'],
          'type' => $item['itemSubType'],
          'damageType' => $item['defaultDamageType'],
          'rarity' => $item['inventory']['tierType'],
        ];
      }

      yield "Done $locale";
    }

    // Update existing weapons
    /** @var Weapon[] $weapons */
    $weapons = $this->em->getRepository(Weapon::class)->findAll();
    yield 'Updating ' . count($weapons) . ' weapons... ';
    foreach ($weapons as $weapon) {
      $hash = $weapon->getHash();
      if (array_key_exists($hash, $parsedItems)) {
        $weapon->setNames($parsedItems[$hash]['names']);
        $weapon->setIcon($parsedItems[$hash]['icon']);
        $weapon->setIconWatermark($parsedItems[$hash]['iconWatermark']);
        $weapon->setScreenshot($parsedItems[$hash]['screenshot']);
        $weapon->setType($parsedItems[$hash]['type']);
        $weapon->setDamageType($parsedItems[$hash]['damageType']);
        $weapon->setRarity($parsedItems[$hash]['rarity']);
        unset($parsedItems[$hash]);
      }
    }
    yield 'Done';

    // Add new weapons
    yield 'Adding ' . count($parsedItems) . ' new weapons... ';
    foreach ($parsedItems as $item) {
      $weapon = new Weapon();
      $weapon
        ->setHash($item['hash'])
        ->setNames($item['names'])
        ->setIcon($item['icon'])
        ->setIconWatermark($item['iconWatermark'])
        ->setScreenshot($item['screenshot'])
        ->setType($item['type'])
        ->setDamageType($item['damageType'])
        ->setRarity($item['rarity']);

      $this->em->persist($weapon);
    }
    yield 'Done';

    $this->em->flush();

    return true;
  }

  public function destinyWeaponsHide(): true|iterable
  {
    yield 'Retrieving all weapons... ';
    /** @var WeaponRepository $weaponRepository */
    $weaponRepository = $this->em->getRepository(Weapon::class);
    $weapons = $weaponRepository->findAll();
    yield 'Done';

    foreach ($weapons as $weapon1) {
      // Check for (Adept) etc
      if ($this->containsKeywords($weapon1->getNames()['en'])) {
        $weapon1->setHidden(true);
        continue;
      }
      // Keep the one with the greatest id
      foreach ($weapons as $weapon2) {
        $id1 = $weapon1->getId();
        $id2 = $weapon2->getId();
        if ($id1 === $id2) {
          continue;
        }
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

    return true;
  }

  private function containsKeywords(string $haystack): bool
  {
    foreach (self::HIDDEN_KEYWORDS as $n) {
      if (str_contains($haystack, $n)) {
        return true;
      }
    }
    return false;
  }
}
