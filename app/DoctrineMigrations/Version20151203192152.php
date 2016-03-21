<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151203192152 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE placeb_reservation (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, box_id INT DEFAULT NULL, status VARCHAR(50) NOT NULL, start_date DATETIME NOT NULL, cancel_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, duration INT NOT NULL, duration_price NUMERIC(10, 2) NOT NULL, duration_unit VARCHAR(50) NOT NULL, insurance_value NUMERIC(10, 2) NOT NULL, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_8D95E443A76ED395 (user_id), INDEX IDX_8D95E443D8177B3F (box_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE placeb_reservation ADD CONSTRAINT FK_8D95E443A76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id)');
        $this->addSql('ALTER TABLE placeb_reservation ADD CONSTRAINT FK_8D95E443D8177B3F FOREIGN KEY (box_id) REFERENCES placeb_box (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE placeb_reservation');
    }
}
