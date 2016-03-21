<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160217115331 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_invoice DROP FOREIGN KEY FK_1108363F511FC912');
        $this->addSql('DROP INDEX UNIQ_1108363F511FC912 ON placeb_invoice');
        $this->addSql('ALTER TABLE placeb_invoice DROP pdf_id');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_invoice ADD pdf_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE placeb_invoice ADD CONSTRAINT FK_1108363F511FC912 FOREIGN KEY (pdf_id) REFERENCES placeb_pdf (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1108363F511FC912 ON placeb_invoice (pdf_id)');
    }
}
