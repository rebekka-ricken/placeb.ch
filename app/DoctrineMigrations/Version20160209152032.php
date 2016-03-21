<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160209152032 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE placeb_one_time_sharing_opened_door (sharing_id INT NOT NULL, door_id INT NOT NULL, INDEX IDX_F06D11CB48F15050 (sharing_id), INDEX IDX_F06D11CB58639EAE (door_id), PRIMARY KEY(sharing_id, door_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE placeb_one_time_sharing_opened_door ADD CONSTRAINT FK_F06D11CB48F15050 FOREIGN KEY (sharing_id) REFERENCES placeb_sharing (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_one_time_sharing_opened_door ADD CONSTRAINT FK_F06D11CB58639EAE FOREIGN KEY (door_id) REFERENCES placeb_door (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_sharing ADD phone VARCHAR(255) DEFAULT NULL, ADD token VARCHAR(255) DEFAULT NULL, ADD period VARCHAR(255) DEFAULT NULL, ADD activated_at DATETIME DEFAULT NULL');

        $this->addSql('UPDATE  placeb_sharing s SET s.type = "friend" WHERE s.type is NULL OR s.type = "" OR s.type = "friend_sharing"');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE placeb_one_time_sharing_opened_door');
        $this->addSql('ALTER TABLE placeb_sharing DROP phone, DROP token, DROP period, DROP activated_at');
    }
}
