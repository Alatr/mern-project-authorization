import { IUserModel } from "./../common/database";
import { User } from "./entity";
import { inject, injectable } from "inversify";
import { TYPES } from "../common/types";
import { IDatabaseService } from "../common/database";
import { ILogger } from "../services/logger";

export interface IUserRepository {
  create: (user: User) => Promise<IUserModel>;
  find: (user: string) => Promise<IUserModel | null>;
}

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.DatabaseService) private databaseService: IDatabaseService
  ) {}
  async create({ email, password, name }: User): Promise<IUserModel> {
    const user = await this.databaseService.userModel.create({
      email,
      password,
      name,
    });
    this.logger.log("[User] User was created", user);
    return user;
  }
  async find(email: string): Promise<IUserModel | null> {
    const user = await this.databaseService.userModel.findOne({ email });
    if (!user) {
      this.logger.log("[User] User was not found");
      return null;
    }
    return user;
  }
}
