<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20151123182223 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE placeb_access_token (id INT AUTO_INCREMENT NOT NULL, client_id INT NOT NULL, user_id INT DEFAULT NULL, token VARCHAR(255) NOT NULL, expires_at INT DEFAULT NULL, scope VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_42B935945F37A13B (token), INDEX IDX_42B9359419EB6921 (client_id), INDEX IDX_42B93594A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE placeb_auth_code (id INT AUTO_INCREMENT NOT NULL, client_id INT NOT NULL, user_id INT DEFAULT NULL, token VARCHAR(255) NOT NULL, redirect_uri LONGTEXT NOT NULL, expires_at INT DEFAULT NULL, scope VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_D991E1225F37A13B (token), INDEX IDX_D991E12219EB6921 (client_id), INDEX IDX_D991E122A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE placeb_client (id INT AUTO_INCREMENT NOT NULL, random_id VARCHAR(255) NOT NULL, redirect_uris LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', secret VARCHAR(255) NOT NULL, allowed_grant_types LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE placeb_refresh_token (id INT AUTO_INCREMENT NOT NULL, client_id INT NOT NULL, user_id INT DEFAULT NULL, token VARCHAR(255) NOT NULL, expires_at INT DEFAULT NULL, scope VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_73B0844A5F37A13B (token), INDEX IDX_73B0844A19EB6921 (client_id), INDEX IDX_73B0844AA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE placeb_user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, username_canonical VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, email_canonical VARCHAR(255) NOT NULL, enabled TINYINT(1) NOT NULL, salt VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, locked TINYINT(1) NOT NULL, expired TINYINT(1) NOT NULL, expires_at DATETIME DEFAULT NULL, confirmation_token VARCHAR(255) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', credentials_expired TINYINT(1) NOT NULL, credentials_expire_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_C124A90292FC23A8 (username_canonical), UNIQUE INDEX UNIQ_C124A902A0D96FBF (email_canonical), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE placeb_access_token ADD CONSTRAINT FK_42B9359419EB6921 FOREIGN KEY (client_id) REFERENCES placeb_client (id)');
        $this->addSql('ALTER TABLE placeb_access_token ADD CONSTRAINT FK_42B93594A76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_auth_code ADD CONSTRAINT FK_D991E12219EB6921 FOREIGN KEY (client_id) REFERENCES placeb_client (id)');
        $this->addSql('ALTER TABLE placeb_auth_code ADD CONSTRAINT FK_D991E122A76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE placeb_refresh_token ADD CONSTRAINT FK_73B0844A19EB6921 FOREIGN KEY (client_id) REFERENCES placeb_client (id)');
        $this->addSql('ALTER TABLE placeb_refresh_token ADD CONSTRAINT FK_73B0844AA76ED395 FOREIGN KEY (user_id) REFERENCES placeb_user (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_access_token DROP FOREIGN KEY FK_42B9359419EB6921');
        $this->addSql('ALTER TABLE placeb_auth_code DROP FOREIGN KEY FK_D991E12219EB6921');
        $this->addSql('ALTER TABLE placeb_refresh_token DROP FOREIGN KEY FK_73B0844A19EB6921');
        $this->addSql('ALTER TABLE placeb_access_token DROP FOREIGN KEY FK_42B93594A76ED395');
        $this->addSql('ALTER TABLE placeb_auth_code DROP FOREIGN KEY FK_D991E122A76ED395');
        $this->addSql('ALTER TABLE placeb_refresh_token DROP FOREIGN KEY FK_73B0844AA76ED395');
        $this->addSql('DROP TABLE placeb_access_token');
        $this->addSql('DROP TABLE placeb_auth_code');
        $this->addSql('DROP TABLE placeb_client');
        $this->addSql('DROP TABLE placeb_refresh_token');
        $this->addSql('DROP TABLE placeb_user');
    }
}
