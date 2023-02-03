<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230203003656 extends AbstractMigration
{
  public function getDescription(): string
  {
    return '';
  }

  public function up(Schema $schema): void
  {
    // this up() migration is auto-generated, please modify it to your needs
    $this->addSql('ALTER TABLE user ADD membership_type INT NOT NULL, ADD display_name VARCHAR(255) NOT NULL, ADD emblem_path VARCHAR(255) NOT NULL, ADD emblem_background_path VARCHAR(255) NOT NULL, ADD light_level INT NOT NULL, ADD clan_name VARCHAR(255) NOT NULL, ADD last_updated DATETIME DEFAULT NULL, CHANGE access_token_expires_at access_token_expires_at DATETIME DEFAULT NULL, CHANGE refresh_token_expires_at refresh_token_expires_at DATETIME DEFAULT NULL');
  }

  public function down(Schema $schema): void
  {
    // this down() migration is auto-generated, please modify it to your needs
    $this->addSql('ALTER TABLE user DROP membership_type, DROP display_name, DROP emblem_path, DROP emblem_background_path, DROP light_level, DROP clan_name, DROP last_updated, CHANGE access_token_expires_at access_token_expires_at DATETIME NOT NULL, CHANGE refresh_token_expires_at refresh_token_expires_at DATETIME NOT NULL');
  }
}
