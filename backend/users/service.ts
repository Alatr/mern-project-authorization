import { IUserModel } from "./../common/database";
import { IConfigService } from "./../../config/service";
import { TYPES } from "./../common/types";
import { inject, injectable } from "inversify";
import { UserLoginDto } from "./dto/login";
import { UserRegistrationDto } from "./dto/register";
import { User } from "./entity";
import { IUserRepository } from "./repository";
import { ILogger } from "../services/logger";

export interface IUserService {
  createUser: (dto: UserRegistrationDto) => Promise<IUserModel | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean | null>;
  getInfo: (email: string) => Promise<IUserModel | null>;
}

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}
  async createUser({
    email,
    name,
    password,
  }: UserRegistrationDto): Promise<IUserModel | null> {
    const newUser = new User(email, name);
    const salt = this.configService.get("SALT");

    await newUser.setPassword(password, Number(salt));
    const existUser = await this.userRepository.find(email);
    if (existUser) {
      this.logger.log("[User] User was already exist");
      return null;
    }

    return await this.userRepository.create(newUser);
  }
  async validateUser({
    email,
    password,
  }: UserLoginDto): Promise<boolean | null> {
    const existUser = await this.userRepository.find(email);
    if (!existUser) {
      this.logger.log("[User] User not exist");
      return null;
    }
    const salt = this.configService.get("SALT");
    const currentUser = new User(
      existUser?.email,
      existUser?.name,
      existUser?.password
    );

    return currentUser.comparePassword(password);
  }
  async getInfo(email: string): Promise<IUserModel | null> {
    return await this.userRepository.find(email);
  }
}
