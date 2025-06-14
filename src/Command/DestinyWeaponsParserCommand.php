<?php

namespace App\Command;

use App\Service\PanelService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
  name: 'destiny:weapons:parse',
  description: 'Parse cached json data for weapons and store them in the database.',
)]
class DestinyWeaponsParserCommand extends Command
{
  private PanelService $panelService;

  public function __construct(PanelService $panelService)
  {
    parent::__construct();
    $this->panelService = $panelService;
  }

  protected function execute(InputInterface $input, OutputInterface $output): int
  {
    $generator = $this->panelService->destinyWeaponsParse();
    $output->writeln($generator);

    return Command::SUCCESS;
  }
}
