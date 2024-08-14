import { UserRepository } from "../repositories/UserRepository";
import User from "../entities/User";
import AppError from "@shared/errors/AppError";
import * as bcrypt from 'bcrypt';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: CreateUserRequest): Promise<User> {
    const emailExists = await UserRepository.findByEmail(email);
    if (emailExists) throw new AppError("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = UserRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await UserRepository.save(newUser);
    return newUser;
  }
}

