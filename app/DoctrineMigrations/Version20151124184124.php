<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151124184124 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_user ADD honorific_title VARCHAR(255) NOT NULL, ADD first_name VARCHAR(255) NOT NULL, ADD last_name VARCHAR(255) NOT NULL, ADD company VARCHAR(255) NOT NULL, ADD phone VARCHAR(255) NOT NULL, ADD country VARCHAR(255) NOT NULL, ADD city VARCHAR(255) NOT NULL, ADD zip VARCHAR(255) NOT NULL, ADD street VARCHAR(255) NOT NULL, ADD created DATETIME NOT NULL, ADD updated DATETIME NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_user DROP honorific_title, DROP first_name, DROP last_name, DROP company, DROP phone, DROP country, DROP city, DROP zip, DROP street, DROP created, DROP updated');
    }
}
