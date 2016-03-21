<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151201183617 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE placeb_price_duration (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, price NUMERIC(10, 2) NOT NULL, duration INT NOT NULL, unit VARCHAR(50) NOT NULL, created DATETIME NOT NULL, updated DATETIME NOT NULL, INDEX IDX_F2318B3712469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE placeb_price_duration ADD CONSTRAINT FK_F2318B3712469DE2 FOREIGN KEY (category_id) REFERENCES placeb_category (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE placeb_price_duration');
    }
}
