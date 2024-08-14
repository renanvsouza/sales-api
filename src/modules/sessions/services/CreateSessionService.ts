import { UserRepository } from "../../users/repositories/UserRepository";
import User from "../../users/entities/User";
import AppError from "@shared/errors/AppError";
import * as bcrypt from 'bcrypt';

interface CreateSessionRequest {
  email: string;
  password: string;
}

interface CreateSessionResponse {
  user: Partial<User>;
}

export default class CreateSessionService {
  public async execute({ email, password }: CreateSessionRequest): Promise<CreateSessionResponse> {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new AppError("Incorrect email/password combination", 401);
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) throw new AppError("Incorrect email/password combination", 401);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  }
}
