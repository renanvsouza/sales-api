import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1723160789076 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const usersTable = new Table({
        "name": "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar"
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()"
          }
        ]
      });

      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
      await queryRunner.createTable(usersTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
    }

}
