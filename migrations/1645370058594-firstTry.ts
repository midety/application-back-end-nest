import {MigrationInterface, QueryRunner} from "typeorm";

export class firstTry1645370058594 implements MigrationInterface {
    name = 'firstTry1645370058594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "img" character varying NOT NULL, "url" character varying NOT NULL, "applicationGroupId" uuid, CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "computer_errors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_f917fed6b8c15d4cc3877fdf7c0" UNIQUE ("name"), CONSTRAINT "PK_f22c6856adcfd7ca9577732bd33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_37e19847b61907fae88215e0a34" FOREIGN KEY ("applicationGroupId") REFERENCES "computer_errors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_37e19847b61907fae88215e0a34"`);
        await queryRunner.query(`DROP TABLE "computer_errors"`);
        await queryRunner.query(`DROP TABLE "application"`);
    }

}
