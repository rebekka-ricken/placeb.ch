<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160115105308 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_box CHANGE door_status_address door_status_address VARCHAR(50) DEFAULT NULL, CHANGE latch_status_address latch_status_address VARCHAR(50) DEFAULT NULL, CHANGE lock_address lock_address VARCHAR(50) DEFAULT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_box CHANGE door_status_address door_status_address VARCHAR(50) NOT NULL COLLATE utf8_unicode_ci, CHANGE latch_status_address latch_status_address VARCHAR(50) NOT NULL COLLATE utf8_unicode_ci, CHANGE lock_address lock_address VARCHAR(50) NOT NULL COLLATE utf8_unicode_ci');
    }
}
