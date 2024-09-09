import { Router } from "express";
import ProductController from "@modules/products/controllers/ProductController";
import validateInput from "@shared/middleware/validateInput";
import Joi from "joi";

const productRoutes = Router();
const productController = new ProductController();

const newProductValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().precision(2).min(0.00).required(),
  quantity: Joi.number().min(1).required(),
});

const updateProductValidation = Joi.object({
  name: Joi.string().min(3).max(30),
  price: Joi.number().precision(2).min(0.00),
  quantity: Joi.number().min(1),
});


productRoutes.route("/")
  .get(productController.list)
  .post(validateInput(newProductValidation), productController.create);

productRoutes.route("/:id")
  .get(productController.show)
  .put(validateInput(updateProductValidation), productController.update)
  .delete(productController.delete);

export default productRoutes;

