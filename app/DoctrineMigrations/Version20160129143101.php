<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160129143101 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_sharing DROP FOREIGN KEY FK_2FECCD13A76ED395');
        $this->addSql('ALTER TABLE placeb_sharing ADD CONSTRAINT FK_2FECCD13A76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id) ON DELETE SET NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_sharing DROP FOREIGN KEY FK_2FECCD13A76ED395');
        $this->addSql('ALTER TABLE placeb_sharing ADD CONSTRAINT FK_2FECCD13A76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id) ON DELETE CASCADE');
    }
}
