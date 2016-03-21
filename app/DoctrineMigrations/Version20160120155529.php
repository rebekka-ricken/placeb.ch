<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160120155529 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE placeb_box_location_doors (box_id INT NOT NULL, location_door_id INT NOT NULL, INDEX IDX_F09A179AD8177B3F (box_id), INDEX IDX_F09A179AB6268D0A (location_door_id), PRIMARY KEY(box_id, location_door_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE placeb_box_location_doors ADD CONSTRAINT FK_F09A179AD8177B3F FOREIGN KEY (box_id) REFERENCES placeb_box (id)');
        $this->addSql('ALTER TABLE placeb_box_location_doors ADD CONSTRAINT FK_F09A179AB6268D0A FOREIGN KEY (location_door_id) REFERENCES placeb_door (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE placeb_box_location_doors');
    }
}
