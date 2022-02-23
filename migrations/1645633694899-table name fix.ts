import {MigrationInterface, QueryRunner} from "typeorm";

export class tableNameFix1645633694899 implements MigrationInterface {
    name = 'tableNameFix1645633694899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "img" character varying NOT NULL, "url" character varying NOT NULL, "application_group_id" uuid NOT NULL, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "application_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_b6c3add548dc0e2e080da8272e9" UNIQUE ("name"), CONSTRAINT "PK_c380914b8e7fb30181e75b83fa6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_3db4abaf0da7febc035c9e1ebaf" FOREIGN KEY ("application_group_id") REFERENCES "application_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_3db4abaf0da7febc035c9e1ebaf"`);
        await queryRunner.query(`DROP TABLE "application_groups"`);
        await queryRunner.query(`DROP TABLE "applications"`);
    }

}
