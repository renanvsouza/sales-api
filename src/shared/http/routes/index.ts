import { Router } from "express";
import ProductController from "@modules/products/controller/ProductController";

const routes = Router();

const productController = new ProductController();

routes.route("/products")
  .get((req, res) => productController.list(req, res))
  .post((req, res) => productController.create(req, res));

routes.route("/products/:id")
  .get((req, res) => productController.show(req, res))
  .put((req, res) => productController.update(req, res))
  .delete((req, res) => productController.delete(req, res));

routes.route("*")
  .get((req, res) => {
    res.json({ message: "Resource not found" });
  });

export default routes;
