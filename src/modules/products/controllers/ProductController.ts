import { NextFunction, Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";
import CreateProductService from "../services/CreateProductService";

export default class ProductController {
  public async list(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    try {
      const listProducts = new ListProductService();
      const products = await listProducts.execute();
      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async show(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { id } = request.params;
      const showProduct = new ShowProductService();
      const product = await showProduct.execute({ id });
      return response.json(product);
    } catch (error) {
      next(error);
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    try {
      const {
        name,
        price,
        quantity
      } = request.body;
      const createProduct = new CreateProductService();
      const product = await createProduct.execute({ name, price, quantity });
      return response.json(product);
    } catch (error) {
      next(error);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { id } = request.params;
      const { name, price, quantity } = request.body;

      const updateProduct = new UpdateProductService();
      const product = await updateProduct.execute({ id, name, price, quantity });
      return response.json(product);
    } catch (error) {
      next(error);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { id } = request.params;
      const deleteProduct = new DeleteProductService();
      const product = await deleteProduct.execute({ id });
      return response.json(product);
    } catch (error) {
      next(error);
    }
  }
}
