import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameToUser1710495599507 implements MigrationInterface {
    name = 'AddLastNameToUser1710495599507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"("id", "firstName")
            SELECT "id",
                "firstName"
            FROM "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_user"
                RENAME TO "user"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME TO "temporary_user"
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"("id", "firstName")
            SELECT "id",
                "firstName"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
    }

}
