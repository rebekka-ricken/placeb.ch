<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160203185855 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_reservation ADD duration_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE placeb_reservation ADD CONSTRAINT FK_8D95E44337B987D8 FOREIGN KEY (duration_id) REFERENCES placeb_duration (id) ON DELETE SET NULL');
        $this->addSql('CREATE INDEX IDX_8D95E44337B987D8 ON placeb_reservation (duration_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_reservation DROP FOREIGN KEY FK_8D95E44337B987D8');
        $this->addSql('DROP INDEX IDX_8D95E44337B987D8 ON placeb_reservation');
        $this->addSql('ALTER TABLE placeb_reservation DROP duration_id');
    }
}
