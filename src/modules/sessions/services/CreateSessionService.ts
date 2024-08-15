import { UserRepository } from "../../users/repositories/UserRepository";
import User from "../../users/entities/User";
import AppError from "@shared/errors/AppError";
import * as bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import AuthConfig from "@config/auth";

interface CreateSessionRequest {
  email: string;
  password: string;
}

interface CreateSessionResponse {
  user: Partial<User>;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: CreateSessionRequest): Promise<CreateSessionResponse> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const token = sign({}, AuthConfig.jwt.secret, {
      subject: user.id,
      expiresIn: AuthConfig.jwt.expiresIn
    });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}
