<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230204172622 extends AbstractMigration
{
  public function getDescription(): string
  {
    return '';
  }

  public function up(Schema $schema): void
  {
    // this up() migration is auto-generated, please modify it to your needs
    $this->addSql('CREATE TABLE bounty_completion (id INT AUTO_INCREMENT NOT NULL, bounty_id INT DEFAULT NULL, user_id INT DEFAULT NULL, attempts INT NOT NULL, completed TINYINT(1) NOT NULL, succeeded TINYINT(1) NOT NULL, clues JSON NOT NULL, history JSON NOT NULL, INDEX IDX_58B4B9DA929C2B06 (bounty_id), INDEX IDX_58B4B9DAA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    $this->addSql('ALTER TABLE bounty_completion ADD CONSTRAINT FK_58B4B9DA929C2B06 FOREIGN KEY (bounty_id) REFERENCES bounty (id)');
    $this->addSql('ALTER TABLE bounty_completion ADD CONSTRAINT FK_58B4B9DAA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
  }

  public function down(Schema $schema): void
  {
    // this down() migration is auto-generated, please modify it to your needs
    $this->addSql('ALTER TABLE bounty_completion DROP FOREIGN KEY FK_58B4B9DA929C2B06');
    $this->addSql('ALTER TABLE bounty_completion DROP FOREIGN KEY FK_58B4B9DAA76ED395');
    $this->addSql('DROP TABLE bounty_completion');
  }
}
