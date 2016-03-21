<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160128182850 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE placeb_sharing');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE placeb_sharing (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, reservation_id INT DEFAULT NULL, email VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, end_date DATETIME DEFAULT NULL, status VARCHAR(50) NOT NULL COLLATE utf8_unicode_ci, INDEX IDX_2FECCD13B83297E7 (reservation_id), INDEX IDX_2FECCD13A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE placeb_sharing ADD CONSTRAINT FK_2FECCD13A76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_sharing ADD CONSTRAINT FK_2FECCD13B83297E7 FOREIGN KEY (reservation_id) REFERENCES placeb_reservation (id) ON DELETE CASCADE');
    }
}
