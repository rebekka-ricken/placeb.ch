<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151224160357 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE placeb_location_translation (id INT AUTO_INCREMENT NOT NULL, object_id INT DEFAULT NULL, locale VARCHAR(8) NOT NULL, field VARCHAR(32) NOT NULL, content LONGTEXT DEFAULT NULL, INDEX IDX_EE924F9B232D562B (object_id), UNIQUE INDEX lookup_unique_idx (locale, object_id, field), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE placeb_location_translation ADD CONSTRAINT FK_EE924F9B232D562B FOREIGN KEY (object_id) REFERENCES placeb_location (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_location CHANGE box_description box_description TEXT NOT NULL, CHANGE location_description location_description TEXT NOT NULL');

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE placeb_location_translation');
        $this->addSql('ALTER TABLE placeb_location CHANGE box_description box_description VARCHAR(500) NOT NULL COLLATE utf8_unicode_ci, CHANGE location_description location_description VARCHAR(500) NOT NULL COLLATE utf8_unicode_ci');

    }
}
