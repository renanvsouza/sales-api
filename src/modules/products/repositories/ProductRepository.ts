import { AppDataSource } from "@shared/typeorm";
import Product from "../entities/Product";

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  findByName(name: string): Promise<Product | null> {
    return this.createQueryBuilder("product")
      .where("product.name = :name", { name })
      .getOne();
  }
});
