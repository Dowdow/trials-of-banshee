<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230327211906 extends AbstractMigration
{
  public function getDescription(): string
  {
    return 'Initial Migration';
  }

  public function up(Schema $schema): void
  {
    // this up() migration is auto-generated, please modify it to your needs
    $this->addSql('CREATE TABLE bounty (id INT AUTO_INCREMENT NOT NULL, weapon_id INT DEFAULT NULL, type INT NOT NULL, date_start DATETIME NOT NULL, INDEX IDX_93BE2C8095B82273 (weapon_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('CREATE TABLE bounty_completion (id INT AUTO_INCREMENT NOT NULL, bounty_id INT DEFAULT NULL, user_id INT DEFAULT NULL, attempts INT NOT NULL, completed TINYINT(1) NOT NULL, perfect_match TINYINT(1) NOT NULL, succeeded TINYINT(1) DEFAULT NULL, clues JSON NOT NULL, history JSON NOT NULL, INDEX IDX_58B4B9DA929C2B06 (bounty_id), INDEX IDX_58B4B9DAA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('CREATE TABLE sound (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, path VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('CREATE TABLE sound_weapon (sound_id INT NOT NULL, weapon_id INT NOT NULL, INDEX IDX_3621D2256AAA5C3E (sound_id), INDEX IDX_3621D22595B82273 (weapon_id), PRIMARY KEY(sound_id, weapon_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, membership_id VARCHAR(255) NOT NULL, display_name VARCHAR(255) NOT NULL, emblem_path VARCHAR(255) NOT NULL, emblem_background_path VARCHAR(255) NOT NULL, light_level INT NOT NULL, character_class INT NOT NULL, character_gender INT NOT NULL, character_race INT NOT NULL, last_updated DATETIME DEFAULT NULL, access_token LONGTEXT NOT NULL, access_token_expires_at DATETIME DEFAULT NULL, refresh_token LONGTEXT NOT NULL, refresh_token_expires_at DATETIME DEFAULT NULL, collections JSON NOT NULL, triumphs JSON NOT NULL, admin TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8D93D6491FB354CD (membership_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('CREATE TABLE weapon (id INT AUTO_INCREMENT NOT NULL, destiny_hash VARCHAR(255) NOT NULL, names JSON NOT NULL, weapon_type INT NOT NULL, damage_type INT NOT NULL, rarity INT NOT NULL, icon VARCHAR(255) NOT NULL, icon_watermark VARCHAR(255) DEFAULT NULL, screenshot VARCHAR(255) NOT NULL, hidden TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_6933A7E6B38C32BF (destiny_hash), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('ALTER TABLE bounty ADD CONSTRAINT FK_93BE2C8095B82273 FOREIGN KEY (weapon_id) REFERENCES weapon (id)');
    $this->addSql('ALTER TABLE bounty_completion ADD CONSTRAINT FK_58B4B9DA929C2B06 FOREIGN KEY (bounty_id) REFERENCES bounty (id)');
    $this->addSql('ALTER TABLE bounty_completion ADD CONSTRAINT FK_58B4B9DAA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    $this->addSql('ALTER TABLE sound_weapon ADD CONSTRAINT FK_3621D2256AAA5C3E FOREIGN KEY (sound_id) REFERENCES sound (id) ON DELETE CASCADE');
    $this->addSql('ALTER TABLE sound_weapon ADD CONSTRAINT FK_3621D22595B82273 FOREIGN KEY (weapon_id) REFERENCES weapon (id) ON DELETE CASCADE');
  }

  public function down(Schema $schema): void
  {
    // this down() migration is auto-generated, please modify it to your needs
    $this->addSql('ALTER TABLE bounty DROP FOREIGN KEY FK_93BE2C8095B82273');
    $this->addSql('ALTER TABLE bounty_completion DROP FOREIGN KEY FK_58B4B9DA929C2B06');
    $this->addSql('ALTER TABLE bounty_completion DROP FOREIGN KEY FK_58B4B9DAA76ED395');
    $this->addSql('ALTER TABLE sound_weapon DROP FOREIGN KEY FK_3621D2256AAA5C3E');
    $this->addSql('ALTER TABLE sound_weapon DROP FOREIGN KEY FK_3621D22595B82273');
    $this->addSql('DROP TABLE bounty');
    $this->addSql('DROP TABLE bounty_completion');
    $this->addSql('DROP TABLE sound');
    $this->addSql('DROP TABLE sound_weapon');
    $this->addSql('DROP TABLE user');
    $this->addSql('DROP TABLE weapon');
  }
}
