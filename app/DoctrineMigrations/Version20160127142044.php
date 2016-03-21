<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160127142044 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE placeb_sharing (id INT AUTO_INCREMENT NOT NULL, reservation_id INT DEFAULT NULL, user_id INT DEFAULT NULL, email VARCHAR(255) NOT NULL, end_date DATETIME DEFAULT NULL, status VARCHAR(50) NOT NULL, INDEX IDX_2FECCD13B83297E7 (reservation_id), INDEX IDX_2FECCD13A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE placeb_sharing ADD CONSTRAINT FK_2FECCD13B83297E7 FOREIGN KEY (reservation_id) REFERENCES placeb_reservation (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_sharing ADD CONSTRAINT FK_2FECCD13A76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id) ON DELETE CASCADE');
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

        $this->addSql('DROP TABLE placeb_sharing');
        $this->addSql('ALTER TABLE placeb_box_location_doors DROP FOREIGN KEY FK_F09A179AD8177B3F');
        $this->addSql('ALTER TABLE placeb_box_location_doors DROP FOREIGN KEY FK_F09A179AB6268D0A');
        $this->addSql('ALTER TABLE placeb_box_location_doors ADD CONSTRAINT FK_F09A179AD8177B3F FOREIGN KEY (box_id) REFERENCES placeb_box (id)');
        $this->addSql('ALTER TABLE placeb_box_location_doors ADD CONSTRAINT FK_F09A179AB6268D0A FOREIGN KEY (location_door_id) REFERENCES placeb_door (id)');
    }
}
