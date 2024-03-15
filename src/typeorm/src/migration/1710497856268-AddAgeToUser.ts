import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToUser1710497856268 implements MigrationInterface {
    name = 'AddAgeToUser1710497856268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL,
                "age" integer NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_user"("id", "firstName", "lastName")
            SELECT "id",
                "firstName",
                "lastName"
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
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user"("id", "firstName", "lastName")
            SELECT "id",
                "firstName",
                "lastName"
            FROM "temporary_user"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_user"
        `);
    }

}
