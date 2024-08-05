import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";

interface CreateProductRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: CreateProductRequest) {
    const productExists = await ProductRepository.findByName(name);

    if (productExists) throw new AppError("Product already exists");

    const newProduct = ProductRepository.create({ name, price, quantity });
    await ProductRepository.save(newProduct);

    return newProduct;
  }
}

