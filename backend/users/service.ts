import { IConfigService } from "./../../config/service";
import { TYPES } from "./../common/types";
import { inject, injectable } from "inversify";
import { UserLoginDto } from "./dto/login";
import { UserRegistrationDto } from "./dto/register";
import { User } from "./entity";

export interface IUserService {
  createUser: (dto: UserRegistrationDto) => Promise<User | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {}
  async createUser({
    email,
    name,
    password,
  }: UserRegistrationDto): Promise<User | null> {
    const newUser = new User(email, name);
    const salt = this.configService.get("SALT");
    console.log(salt);

    await newUser.setPassword(password, Number(salt));
    // check exist user
    // if exist
    // null
    return null;
  }
  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
