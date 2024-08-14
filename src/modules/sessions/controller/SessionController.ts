import { Request, Response, NextFunction } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = request.body;
      const createSession = new CreateSessionService();
      const user = await createSession.execute({ email, password });
      return response.json(user);
    } catch (error) {
      next(error);
    }
  }
}
