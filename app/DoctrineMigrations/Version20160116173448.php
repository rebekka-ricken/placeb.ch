<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160116173448 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_box DROP FOREIGN KEY FK_D6C65D1B12469DE2');
        $this->addSql('ALTER TABLE placeb_box DROP FOREIGN KEY FK_D6C65D1B64D218E');
        $this->addSql('ALTER TABLE placeb_box ADD CONSTRAINT FK_D6C65D1B12469DE2 FOREIGN KEY (category_id) REFERENCES placeb_category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_box ADD CONSTRAINT FK_D6C65D1B64D218E FOREIGN KEY (location_id) REFERENCES placeb_location (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_pdf DROP FOREIGN KEY FK_D09FCEAD2989F1FD');
        $this->addSql('ALTER TABLE placeb_pdf ADD CONSTRAINT FK_D09FCEAD2989F1FD FOREIGN KEY (invoice_id) REFERENCES placeb_invoice (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_reservation DROP FOREIGN KEY FK_8D95E443A76ED395');
        $this->addSql('ALTER TABLE placeb_reservation DROP FOREIGN KEY FK_8D95E443D8177B3F');
        $this->addSql('ALTER TABLE placeb_reservation ADD CONSTRAINT FK_8D95E443A76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_reservation ADD CONSTRAINT FK_8D95E443D8177B3F FOREIGN KEY (box_id) REFERENCES placeb_box (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_box DROP FOREIGN KEY FK_D6C65D1B12469DE2');
        $this->addSql('ALTER TABLE placeb_box DROP FOREIGN KEY FK_D6C65D1B64D218E');
        $this->addSql('ALTER TABLE placeb_box ADD CONSTRAINT FK_D6C65D1B12469DE2 FOREIGN KEY (category_id) REFERENCES placeb_category (id)');
        $this->addSql('ALTER TABLE placeb_box ADD CONSTRAINT FK_D6C65D1B64D218E FOREIGN KEY (location_id) REFERENCES placeb_location (id)');
        $this->addSql('ALTER TABLE placeb_pdf DROP FOREIGN KEY FK_D09FCEAD2989F1FD');
        $this->addSql('ALTER TABLE placeb_pdf ADD CONSTRAINT FK_D09FCEAD2989F1FD FOREIGN KEY (invoice_id) REFERENCES placeb_invoice (id)');
        $this->addSql('ALTER TABLE placeb_reservation DROP FOREIGN KEY FK_8D95E443A76ED395');
        $this->addSql('ALTER TABLE placeb_reservation DROP FOREIGN KEY FK_8D95E443D8177B3F');
        $this->addSql('ALTER TABLE placeb_reservation ADD CONSTRAINT FK_8D95E443A76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id)');
        $this->addSql('ALTER TABLE placeb_reservation ADD CONSTRAINT FK_8D95E443D8177B3F FOREIGN KEY (box_id) REFERENCES placeb_box (id)');
    }
}
