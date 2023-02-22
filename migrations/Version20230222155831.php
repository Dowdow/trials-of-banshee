<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230222155831 extends AbstractMigration
{
  public function getDescription(): string
  {
    return '';
  }

  public function up(Schema $schema): void
  {
    // this up() migration is auto-generated, please modify it to your needs
    $this->addSql('ALTER TABLE bounty_completion ADD perfect_match TINYINT(1) NOT NULL');
    $this->addSql('ALTER TABLE user ADD collections JSON NOT NULL, ADD triumphs JSON NOT NULL');
  }

  public function down(Schema $schema): void
  {
    // this down() migration is auto-generated, please modify it to your needs
    $this->addSql('ALTER TABLE bounty_completion DROP perfect_match');
    $this->addSql('ALTER TABLE user DROP collections, DROP triumphs');
  }
}
