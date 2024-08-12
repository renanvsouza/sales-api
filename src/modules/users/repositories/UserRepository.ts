import { AppDataSource } from "@shared/typeorm";
import User from "../entities/User";

export const UserRepository = AppDataSource.getRepository(User).extend({
  findByName(name: string): Promise<User | null> {
    return this.findOne({ where: { name } });
  },
  findById(id: string): Promise<User | null> {
    return this.findOne({ where: { id } });
  },
  findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  },
});
