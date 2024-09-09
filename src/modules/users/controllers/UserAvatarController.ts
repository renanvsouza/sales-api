import { Request, Response, NextFunction } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {
  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const updateAvatar = new UpdateUserAvatarService();

      const user = await updateAvatar.execute({
        userId: request.user.id,
        avatarFilename: request.file?.filename || ''
       });

      return response.json(user);
    } catch (error) {
      next(error);
    }
  }
}
