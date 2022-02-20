import {MigrationInterface, QueryRunner} from "typeorm";

export class secondtry1645370969936 implements MigrationInterface {
    name = 'secondtry1645370969936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_37e19847b61907fae88215e0a34"`);
        await queryRunner.query(`CREATE TABLE "application_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_afb6332c3058614370a6e35b665" UNIQUE ("name"), CONSTRAINT "PK_6898c4ae79225be5023a8da3989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_37e19847b61907fae88215e0a34" FOREIGN KEY ("applicationGroupId") REFERENCES "application_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_37e19847b61907fae88215e0a34"`);
        await queryRunner.query(`DROP TABLE "application_group"`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_37e19847b61907fae88215e0a34" FOREIGN KEY ("applicationGroupId") REFERENCES "computer_errors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
