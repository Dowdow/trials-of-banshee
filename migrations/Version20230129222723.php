<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230129222723 extends AbstractMigration
{
  public function getDescription(): string
  {
    return '';
  }

  public function up(Schema $schema): void
  {
    // this up() migration is auto-generated, please modify it to your needs
    $this->addSql('CREATE TABLE bounty (id INT AUTO_INCREMENT NOT NULL, weapon_id INT DEFAULT NULL, type INT NOT NULL, date_start DATETIME NOT NULL, INDEX IDX_93BE2C8095B82273 (weapon_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('ALTER TABLE bounty ADD CONSTRAINT FK_93BE2C8095B82273 FOREIGN KEY (weapon_id) REFERENCES weapon (id)');
  }

  public function down(Schema $schema): void
  {
    // this down() migration is auto-generated, please modify it to your needs
    $this->addSql('ALTER TABLE bounty DROP FOREIGN KEY FK_93BE2C8095B82273');
    $this->addSql('DROP TABLE bounty');
  }
}
