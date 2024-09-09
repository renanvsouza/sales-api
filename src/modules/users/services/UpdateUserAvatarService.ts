import { UserRepository } from "../repositories/UserRepository";
import User from "../entities/User";
import AppError from "@shared/errors/AppError";
import path from 'path';
import fs from 'fs';
import uploadConfig from "@config/upload";

interface UpdateUserAvatarServiceRequest {
  userId: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFilename
  }: UpdateUserAvatarServiceRequest): Promise<User> {
    const user = await UserRepository.findById(userId);

    if (!user) throw new AppError("User not found");

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await UserRepository.save(user);
    return user;
  }
}

