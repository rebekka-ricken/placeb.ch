<?php

namespace Application\Migrations;

use AppBundle\Entity\Box;
use AppBundle\Entity\BoxDoor;
use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160210142310 extends AbstractMigration implements ContainerAwareInterface
{
    private $doorsData = null;

    /**
     * @var ContainerInterface
     */
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function preUp(Schema $schema)
    {
        $this->doorsData = $this->connection->fetchAll('SELECT id, door_status_address, latch_status_address, lock_address, door_status FROM placeb_box WHERE lock_address IS NOT NULL');
    }

    public function postUp(Schema $schema)
    {
        /** @var EntityManager $em */
        $em = $this->container->get('doctrine.orm.entity_manager');

        foreach ($this->doorsData as $doorData) {
            $boxReference = $em->getReference('AppBundle:Box', $doorData['id']);

            if ($boxReference && $boxReference instanceof Box) {
                $boxDoor = new BoxDoor();

                $boxDoor
                    ->setBox($boxReference)
                    ->setAddress($doorData['lock_address'])
                    ->setDelay(2)
                    ->setDoorStatus($doorData['door_status'])
                    ->setDoorStatusAddress($doorData['door_status_address'])
                    ->setLatchStatusAddress($doorData['latch_status_address']);

                $em->persist($boxDoor);
                $em->flush();
            }
        }
    }

    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_box DROP door_status, DROP door_status_address, DROP latch_status_address, DROP lock_address');
        $this->addSql('ALTER TABLE placeb_door ADD box_id INT DEFAULT NULL, ADD created DATETIME NOT NULL, ADD updated DATETIME NOT NULL, ADD door_status VARCHAR(50) DEFAULT NULL, ADD door_status_address VARCHAR(50) DEFAULT NULL, ADD latch_status_address VARCHAR(50) DEFAULT NULL');
        $this->addSql('ALTER TABLE placeb_door ADD CONSTRAINT FK_C6522B66D8177B3F FOREIGN KEY (box_id) REFERENCES placeb_box (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_C6522B66D8177B3F ON placeb_door (box_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE placeb_box ADD door_status VARCHAR(50) DEFAULT NULL COLLATE utf8_unicode_ci, ADD door_status_address VARCHAR(50) DEFAULT NULL COLLATE utf8_unicode_ci, ADD latch_status_address VARCHAR(50) DEFAULT NULL COLLATE utf8_unicode_ci, ADD lock_address VARCHAR(50) DEFAULT NULL COLLATE utf8_unicode_ci');
        $this->addSql('ALTER TABLE placeb_door DROP FOREIGN KEY FK_C6522B66D8177B3F');
        $this->addSql('DROP INDEX IDX_C6522B66D8177B3F ON placeb_door');
        $this->addSql('ALTER TABLE placeb_door DROP box_id, DROP created, DROP updated, DROP door_status, DROP door_status_address, DROP latch_status_address');
    }
}
