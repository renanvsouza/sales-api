import { Router } from "express";
import SessionController from "../controller/SessionController";
import validateInput from "@shared/middleware/validateInput";
import Joi from "joi";

const sessionRoutes = Router();
const sessionController = new SessionController();

const createSessionValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

sessionRoutes.route('/')
  .post(validateInput(createSessionValidation), sessionController.create);

export default sessionRoutes;
