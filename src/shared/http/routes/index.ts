import { Router } from "express";
import productRoutes from "@modules/products/routes/products";
import userRoutes from "@modules/users/routes/users";
import sessionRoutes from "@modules/sessions/routes/sessions";

const routes = Router();

routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.use('/session', sessionRoutes);

routes.route('*')
  .get((req, res) => {
    res.json({ message: "Resource not found" });
  });

export default routes;
