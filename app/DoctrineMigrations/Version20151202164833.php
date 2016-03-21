<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151202164833 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE placeb_box (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, location_id INT DEFAULT NULL, box_id VARCHAR(200) NOT NULL, box_status VARCHAR(50) NOT NULL, door_status VARCHAR(50) NOT NULL, latch_status VARCHAR(50) NOT NULL, height DOUBLE PRECISION DEFAULT NULL, width DOUBLE PRECISION DEFAULT NULL, depth DOUBLE PRECISION DEFAULT NULL, deduction DOUBLE PRECISION DEFAULT NULL, comment VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_D6C65D1BD8177B3F (box_id), INDEX IDX_D6C65D1B12469DE2 (category_id), INDEX IDX_D6C65D1B64D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE placeb_box ADD CONSTRAINT FK_D6C65D1B12469DE2 FOREIGN KEY (category_id) REFERENCES placeb_category (id)');
        $this->addSql('ALTER TABLE placeb_box ADD CONSTRAINT FK_D6C65D1B64D218E FOREIGN KEY (location_id) REFERENCES placeb_location (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE placeb_box');
    }
}
