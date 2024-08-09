import { ProductRepository } from "../repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import { UpdateResult } from "typeorm";

interface UpdateProductRequest {
  id: string;
  name: string | null;
  price: number | null;
  quantity: number | null;
}

export default class UpdateProductService {
  public async execute(productData: UpdateProductRequest): Promise<UpdateResult> {
    const product = await ProductRepository.findOne({
      where: { id: productData.id }
    });

    if (!product) throw new AppError("Product not found");

    if (productData.name) {
      const productExists = await ProductRepository.findByName(productData.name);
      if (productExists && productExists.id !== product.id) {
        throw new AppError("A product with the given name already exists");
      }

      product.name = productData.name;
    }

    if (productData.price) product.price = productData.price;
    if (productData.quantity) product.quantity = productData.quantity;

    return await ProductRepository.update(productData.id, product);
  }
}

