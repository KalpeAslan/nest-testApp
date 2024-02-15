import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1708028739519 implements MigrationInterface {
    name = 'Init1708028739519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "block" ("id" SERIAL NOT NULL, "number" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_38414873c187a3e0c7943bc4c7b" UNIQUE ("number"), CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "hash" character varying(66) NOT NULL, "timestamp" TIMESTAMP NOT NULL, "transactionFrom" character varying(42) NOT NULL, "transactionTo" character varying(42) NOT NULL, "value" character varying NOT NULL, "blockId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_ac3a4377dd117a7cf615cde7b63" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_ac3a4377dd117a7cf615cde7b63"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "block"`);
    }

}
