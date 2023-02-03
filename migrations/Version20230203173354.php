<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230203173354 extends AbstractMigration
{
  public function getDescription(): string
  {
    return '';
  }

  public function up(Schema $schema): void
  {
    // this up() migration is auto-generated, please modify it to your needs
    $this->addSql('ALTER TABLE user ADD character_gender INT NOT NULL, ADD character_race INT NOT NULL, DROP clan_name, CHANGE membership_type character_class INT NOT NULL');
  }

  public function down(Schema $schema): void
  {
    // this down() migration is auto-generated, please modify it to your needs
    $this->addSql('ALTER TABLE user ADD membership_type INT NOT NULL, ADD clan_name VARCHAR(255) NOT NULL, DROP character_class, DROP character_gender, DROP character_race');
  }
}
