import { ProductRepository } from "@shared/typeorm/repositories/ProductRepository";
import Product from "@shared/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface ShowProductRequest {
  id: string;
}

export default class ShowProductService {
  public async execute({ id }: ShowProductRequest): Promise<Product> {
    const product = await ProductRepository.findOne({ where: { id } });
    if (!product) throw new AppError("Product not found");
    return product;
  }
}

