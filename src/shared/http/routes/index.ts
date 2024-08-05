import { Router } from "express";

const routes = Router();

routes.route("/")
  .get((req, res) => {
    res.json({ message: "Hello World" });
  });


routes.route("*")
  .get((req, res) => {
    res.json({ message: "Resource not found" });
  });

export default routes;
