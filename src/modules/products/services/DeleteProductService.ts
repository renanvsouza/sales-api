import { ProductRepository } from "@shared/typeorm/repositories/ProductRepository";
import Product from "@shared/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface DeleteProductRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: DeleteProductRequest): Promise<Product> {
    const product = await ProductRepository.findOne({ where: { id } });
    if (!product) throw new AppError("Product not found");

    return await ProductRepository.remove(product);
  }
}

