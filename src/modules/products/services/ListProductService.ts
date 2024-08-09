import { ProductRepository } from "../repositories/ProductRepository";
import Product from "../entities/Product";

export default class ListProductService {
  public async execute(): Promise<Product[]> {
   const products = await ProductRepository.find();
   return products;
  }
}

