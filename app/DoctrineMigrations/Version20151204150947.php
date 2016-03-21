<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20151204150947 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_duration DROP FOREIGN KEY FK_F2318B3712469DE2');
        $this->addSql('DROP INDEX idx_f2318b3712469de2 ON placeb_duration');
        $this->addSql('CREATE INDEX IDX_4109455512469DE2 ON placeb_duration (category_id)');
        $this->addSql('ALTER TABLE placeb_duration ADD CONSTRAINT FK_F2318B3712469DE2 FOREIGN KEY (category_id) REFERENCES placeb_category (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_duration DROP FOREIGN KEY FK_4109455512469DE2');
        $this->addSql('DROP INDEX idx_4109455512469de2 ON placeb_duration');
        $this->addSql('CREATE INDEX IDX_F2318B3712469DE2 ON placeb_duration (category_id)');
        $this->addSql('ALTER TABLE placeb_duration ADD CONSTRAINT FK_4109455512469DE2 FOREIGN KEY (category_id) REFERENCES placeb_category (id) ON DELETE CASCADE');
    }
}
