<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160316174222 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_access_token DROP FOREIGN KEY FK_42B9359419EB6921');
        $this->addSql('ALTER TABLE placeb_access_token ADD CONSTRAINT FK_42B9359419EB6921 FOREIGN KEY (client_id) REFERENCES placeb_client (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_auth_code DROP FOREIGN KEY FK_D991E12219EB6921');
        $this->addSql('ALTER TABLE placeb_auth_code ADD CONSTRAINT FK_D991E12219EB6921 FOREIGN KEY (client_id) REFERENCES placeb_client (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_refresh_token DROP FOREIGN KEY FK_73B0844A19EB6921');
        $this->addSql('ALTER TABLE placeb_refresh_token ADD CONSTRAINT FK_73B0844A19EB6921 FOREIGN KEY (client_id) REFERENCES placeb_client (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_access_token DROP FOREIGN KEY FK_42B9359419EB6921');
        $this->addSql('ALTER TABLE placeb_access_token ADD CONSTRAINT FK_42B9359419EB6921 FOREIGN KEY (client_id) REFERENCES placeb_client (id)');
        $this->addSql('ALTER TABLE placeb_auth_code DROP FOREIGN KEY FK_D991E12219EB6921');
        $this->addSql('ALTER TABLE placeb_auth_code ADD CONSTRAINT FK_D991E12219EB6921 FOREIGN KEY (client_id) REFERENCES placeb_client (id)');
        $this->addSql('ALTER TABLE placeb_refresh_token DROP FOREIGN KEY FK_73B0844A19EB6921');
        $this->addSql('ALTER TABLE placeb_refresh_token ADD CONSTRAINT FK_73B0844A19EB6921 FOREIGN KEY (client_id) REFERENCES placeb_client (id)');
    }
}
