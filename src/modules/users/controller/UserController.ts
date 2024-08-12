import { Request, Response, NextFunction } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";

export default class UserController {
  public async list(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    try {
      const listUsers = new ListUserService();
      const users = await listUsers.execute();
      return response.json(users);
    } catch (error) {
      next(error);
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { name, email, password } = request.body;
      const createUser = new CreateUserService();
      const user = await createUser.execute({ name, email, password });
      return response.json(user);
    } catch (error) {
      next(error);
    }
  }
}
