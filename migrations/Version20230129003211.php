<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230129003211 extends AbstractMigration
{
  public function getDescription(): string
  {
    return '';
  }

  public function up(Schema $schema): void
  {
    // this up() migration is auto-generated, please modify it to your needs
    $this->addSql('CREATE TABLE sound (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, path VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('CREATE TABLE weapon (id INT AUTO_INCREMENT NOT NULL, destiny_hash VARCHAR(255) NOT NULL, names JSON NOT NULL, weapon_type INT NOT NULL, damage_type INT NOT NULL, rarity INT NOT NULL, icon VARCHAR(255) NOT NULL, screenshot VARCHAR(255) NOT NULL, hidden TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_6933A7E6B38C32BF (destiny_hash), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('CREATE TABLE weapon_sound (weapon_id INT NOT NULL, sound_id INT NOT NULL, INDEX IDX_D53433E195B82273 (weapon_id), INDEX IDX_D53433E16AAA5C3E (sound_id), PRIMARY KEY(weapon_id, sound_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('ALTER TABLE weapon_sound ADD CONSTRAINT FK_D53433E195B82273 FOREIGN KEY (weapon_id) REFERENCES weapon (id) ON DELETE CASCADE');
    $this->addSql('ALTER TABLE weapon_sound ADD CONSTRAINT FK_D53433E16AAA5C3E FOREIGN KEY (sound_id) REFERENCES sound (id) ON DELETE CASCADE');
  }

  public function down(Schema $schema): void
  {
    // this down() migration is auto-generated, please modify it to your needs
    $this->addSql('ALTER TABLE weapon_sound DROP FOREIGN KEY FK_D53433E195B82273');
    $this->addSql('ALTER TABLE weapon_sound DROP FOREIGN KEY FK_D53433E16AAA5C3E');
    $this->addSql('DROP TABLE sound');
    $this->addSql('DROP TABLE weapon');
    $this->addSql('DROP TABLE weapon_sound');
  }
}
