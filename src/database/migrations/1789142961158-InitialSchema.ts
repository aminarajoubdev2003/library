import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1789142961158 implements MigrationInterface {
    name = 'InitialSchema1789142961158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`total_copies\` int NOT NULL, \`available_copies\` int NOT NULL, UNIQUE INDEX \`IDX_c10a44a29ef231062f22b1b7ac\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`borrowing\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`book_id\` int NOT NULL, \`borrow_date\` datetime NOT NULL, \`due_date\` datetime NOT NULL, \`return_date\` datetime NULL, \`fine\` decimal NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('ADMIN', 'MEMBER') NOT NULL DEFAULT 'MEMBER', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`borrowing\` ADD CONSTRAINT \`FK_c730122dbf4306038204a362a53\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`borrowing\` ADD CONSTRAINT \`FK_5a5ead47aacc96376e7ab0d1a62\` FOREIGN KEY (\`book_id\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`borrowing\` DROP FOREIGN KEY \`FK_5a5ead47aacc96376e7ab0d1a62\``);
        await queryRunner.query(`ALTER TABLE \`borrowing\` DROP FOREIGN KEY \`FK_c730122dbf4306038204a362a53\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`borrowing\``);
        await queryRunner.query(`DROP INDEX \`IDX_c10a44a29ef231062f22b1b7ac\` ON \`book\``);
        await queryRunner.query(`DROP TABLE \`book\``);
    }

}
