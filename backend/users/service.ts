import { injectable } from "inversify";
import { UserLoginDto } from "./dto/login";
import { UserRegistrationDto } from "./dto/register";
import { User } from "./entity";

export interface IUserService {
  createUser: (dto: UserRegistrationDto) => Promise<User | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}

@injectable()
export class UserService implements IUserService {
  async createUser({
    email,
    name,
    password,
  }: UserRegistrationDto): Promise<User | null> {
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    // check exist user
    // if exist
    // null
    return null;
  }
  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
