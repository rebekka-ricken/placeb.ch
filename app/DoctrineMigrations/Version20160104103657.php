<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160104103657 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE placeb_pdf (id INT AUTO_INCREMENT NOT NULL, invoice_id INT NOT NULL, filesystem_map_id VARCHAR(255) DEFAULT NULL, storage_path VARCHAR(255) DEFAULT NULL, created DATETIME NOT NULL, UNIQUE INDEX UNIQ_D09FCEAD2989F1FD (invoice_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE placeb_pdf ADD CONSTRAINT FK_D09FCEAD2989F1FD FOREIGN KEY (invoice_id) REFERENCES placeb_invoice (id)');
        $this->addSql('ALTER TABLE placeb_invoice ADD pdf_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE placeb_invoice ADD CONSTRAINT FK_1108363F511FC912 FOREIGN KEY (pdf_id) REFERENCES placeb_pdf (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1108363F511FC912 ON placeb_invoice (pdf_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_invoice DROP FOREIGN KEY FK_1108363F511FC912');
        $this->addSql('DROP TABLE placeb_pdf');
        $this->addSql('DROP INDEX UNIQ_1108363F511FC912 ON placeb_invoice');
        $this->addSql('ALTER TABLE placeb_invoice DROP pdf_id');
    }
}
