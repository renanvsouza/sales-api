import { ProductRepository } from "@shared/typeorm/repositories/ProductRepository";
import Product from "@shared/typeorm/entities/Product";

export default class ListProductService {
  public async execute(): Promise<Product[]> {
   const products = await ProductRepository.find();
   return products;
  }
}

