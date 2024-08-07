import { ProductRepository } from "@shared/typeorm/repositories/ProductRepository";
import Product from "@shared/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface CreateProductRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: CreateProductRequest): Promise<Product> {
    const productExists = await ProductRepository.findByName(name);

    if (productExists) throw new AppError("A product with the given name already exists");

    const newProduct = ProductRepository.create({ name, price, quantity });
    await ProductRepository.save(newProduct);

    return newProduct;
  }
}

