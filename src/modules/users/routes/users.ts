import { Router } from "express";
import UserController from "../controllers/UserController";
import validateInput from "@shared/middleware/validateInput";
import Joi from "joi";
import isAuthenticated from "@shared/middleware/isAuthenticated";

const userRoutes = Router();
const userController = new UserController();

const createUserValidation = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

userRoutes.route("/")
  .get(isAuthenticated, userController.list)
  .post(validateInput(createUserValidation), userController.create);

export default userRoutes;
