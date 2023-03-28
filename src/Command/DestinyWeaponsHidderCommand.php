<?php

namespace App\Command;

use App\Service\PanelService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
  name: 'destiny:weapons:hide',
  description: 'Hide duplicate weapons in the database.',
)]
class DestinyWeaponsHidderCommand extends Command
{
  private PanelService $panelService;

  public function __construct(PanelService $panelService)
  {
    parent::__construct();
    $this->panelService = $panelService;
  }

  protected function execute(InputInterface $input, OutputInterface $output): int
  {
    $generator = $this->panelService->destinyWeaponsHide();
    $output->writeln($generator);

    return Command::SUCCESS;
  }
}
