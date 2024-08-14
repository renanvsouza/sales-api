import { DataSource } from "typeorm";
import Product from "../../modules/products/entities/Product";
import User from "../../modules/users/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "salesdb",
  synchronize: true,
  logging: false,
  entities: [Product, User],
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
});
