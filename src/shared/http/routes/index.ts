import { Router } from "express";
import productRoutes from "@modules/products/routes/products";

const routes = Router();

routes.use('/products', productRoutes);

routes.route('*')
  .get((req, res) => {
    res.json({ message: "Resource not found" });
  });

export default routes;
