<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160202171045 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_history ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE placeb_history ADD CONSTRAINT FK_A6D75130A76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_A6D75130A76ED395 ON placeb_history (user_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_history DROP FOREIGN KEY FK_A6D75130A76ED395');
        $this->addSql('DROP INDEX IDX_A6D75130A76ED395 ON placeb_history');
        $this->addSql('ALTER TABLE placeb_history DROP user_id');
    }
}
