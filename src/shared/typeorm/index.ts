import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "salesdb",
  synchronize: true,
  logging: false,
  entities: ["src/shared/typeorm/entities/*.ts"],
  migrations: ["src/shared/typeorm/migrations/*.ts"],
});
