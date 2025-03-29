import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1743237152052 implements MigrationInterface {
    name = 'Migrate1743237152052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    }

}
