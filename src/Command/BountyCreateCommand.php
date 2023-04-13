<?php

namespace App\Command;

use App\Service\PanelService;
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
  private PanelService $panelService;

  public function __construct(PanelService $panelService)
  {
    parent::__construct();
    $this->panelService = $panelService;
  }

  protected function configure(): void
  {
    parent::configure();
    $this->addArgument('date', InputArgument::OPTIONAL, 'Date with YYYY-MM-DD format.');
  }

  protected function execute(InputInterface $input, OutputInterface $output): int
  {
    $dateArgument = $input->getArgument('date');
    $generator = $this->panelService->bountyCreate($dateArgument);
    $output->writeln($generator);

    return Command::SUCCESS;
  }


}
