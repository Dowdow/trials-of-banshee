<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230129023111 extends AbstractMigration
{
  public function getDescription(): string
  {
    return '';
  }

  public function up(Schema $schema): void
  {
    // this up() migration is auto-generated, please modify it to your needs
    $this->addSql('CREATE TABLE sound_weapon (sound_id INT NOT NULL, weapon_id INT NOT NULL, INDEX IDX_3621D2256AAA5C3E (sound_id), INDEX IDX_3621D22595B82273 (weapon_id), PRIMARY KEY(sound_id, weapon_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('ALTER TABLE sound_weapon ADD CONSTRAINT FK_3621D2256AAA5C3E FOREIGN KEY (sound_id) REFERENCES sound (id) ON DELETE CASCADE');
    $this->addSql('ALTER TABLE sound_weapon ADD CONSTRAINT FK_3621D22595B82273 FOREIGN KEY (weapon_id) REFERENCES weapon (id) ON DELETE CASCADE');
    $this->addSql('ALTER TABLE weapon_sound DROP FOREIGN KEY FK_D53433E16AAA5C3E');
    $this->addSql('ALTER TABLE weapon_sound DROP FOREIGN KEY FK_D53433E195B82273');
    $this->addSql('DROP TABLE weapon_sound');
  }

  public function down(Schema $schema): void
  {
    // this down() migration is auto-generated, please modify it to your needs
    $this->addSql('CREATE TABLE weapon_sound (weapon_id INT NOT NULL, sound_id INT NOT NULL, INDEX IDX_D53433E16AAA5C3E (sound_id), INDEX IDX_D53433E195B82273 (weapon_id), PRIMARY KEY(weapon_id, sound_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
    $this->addSql('ALTER TABLE weapon_sound ADD CONSTRAINT FK_D53433E16AAA5C3E FOREIGN KEY (sound_id) REFERENCES sound (id) ON DELETE CASCADE');
    $this->addSql('ALTER TABLE weapon_sound ADD CONSTRAINT FK_D53433E195B82273 FOREIGN KEY (weapon_id) REFERENCES weapon (id) ON DELETE CASCADE');
    $this->addSql('ALTER TABLE sound_weapon DROP FOREIGN KEY FK_3621D2256AAA5C3E');
    $this->addSql('ALTER TABLE sound_weapon DROP FOREIGN KEY FK_3621D22595B82273');
    $this->addSql('DROP TABLE sound_weapon');
  }
}
