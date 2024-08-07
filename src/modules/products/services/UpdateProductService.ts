import { ProductRepository } from "@shared/typeorm/repositories/ProductRepository";
import Product from "@shared/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";

interface UpdateProductRequest {
  id: string;
  name: string | null;
  price: number | null;
  quantity: number | null;
}

export default class UpdateProductService {
  public async execute(productData: UpdateProductRequest): Promise<Product> {
    const product = await ProductRepository.findOne({ where: { id: productData.id } });

    if (!product) throw new AppError("Product not found");

    if (productData.name) {
      const productExists = await ProductRepository.findByName(productData.name);
      if (productExists && productExists.id !== product.id) {
        throw new AppError("A product with the given name already exists");
      }
    }

    if (productData.price) product.price = productData.price;
    if (productData.quantity) product.quantity = productData.quantity;

    await ProductRepository.save(product);
    return product;
  }
}

