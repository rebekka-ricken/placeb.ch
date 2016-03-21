<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160121115653 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_box_location_doors DROP FOREIGN KEY FK_F09A179AB6268D0A');
        $this->addSql('ALTER TABLE placeb_box_location_doors DROP FOREIGN KEY FK_F09A179AD8177B3F');
        $this->addSql('ALTER TABLE placeb_box_location_doors ADD CONSTRAINT FK_F09A179AB6268D0A FOREIGN KEY (location_door_id) REFERENCES placeb_door (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_box_location_doors ADD CONSTRAINT FK_F09A179AD8177B3F FOREIGN KEY (box_id) REFERENCES placeb_box (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_box_location_doors DROP FOREIGN KEY FK_F09A179AD8177B3F');
        $this->addSql('ALTER TABLE placeb_box_location_doors DROP FOREIGN KEY FK_F09A179AB6268D0A');
        $this->addSql('ALTER TABLE placeb_box_location_doors ADD CONSTRAINT FK_F09A179AD8177B3F FOREIGN KEY (box_id) REFERENCES placeb_box (id)');
        $this->addSql('ALTER TABLE placeb_box_location_doors ADD CONSTRAINT FK_F09A179AB6268D0A FOREIGN KEY (location_door_id) REFERENCES placeb_door (id)');
    }
}
