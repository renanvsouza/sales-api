import { UserRepository } from "../repositories/UserRepository";
import User from "../entities/User";

export default class ListUserService {
  public async execute(): Promise<User[]> {
   const users = await UserRepository.find();
   return users;
  }
}
