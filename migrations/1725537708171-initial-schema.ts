import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1725537708171 implements MigrationInterface {
  name = 'InitialSchema1725537708171';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY, 
                "email" VARCHAR NOT NULL, 
                "password" VARCHAR NOT NULL, 
                "admin" BOOLEAN NOT NULL DEFAULT false
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "report" (
                "id" SERIAL PRIMARY KEY, 
                "approved" BOOLEAN NOT NULL DEFAULT false, 
                "price" INT NOT NULL, 
                "make" VARCHAR NOT NULL, 
                "model" VARCHAR NOT NULL, 
                "year" INT NOT NULL, 
                "lng" FLOAT NOT NULL, 
                "lat" FLOAT NOT NULL, 
                "mileage" INT NOT NULL, 
                "userId" INT,
                CONSTRAINT "FK_user_report" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "report"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
