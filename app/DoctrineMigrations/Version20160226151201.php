<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160226151201 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_user CHANGE phone phone VARCHAR(255) DEFAULT NULL, CHANGE country country VARCHAR(255) DEFAULT NULL, CHANGE city city VARCHAR(255) DEFAULT NULL, CHANGE zip zip VARCHAR(255) DEFAULT NULL, CHANGE street street VARCHAR(255) DEFAULT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_user CHANGE phone phone VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE country country VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE city city VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE zip zip VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE street street VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci');
    }
}
