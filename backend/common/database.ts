import { ILogger } from "./../services/logger";
import { inject, injectable } from "inversify";
import mongoose, { Schema as ISchema, Model, Document } from "mongoose";
import mongoosePkg from "mongoose";
const { Schema, model } = mongoosePkg;
import { TYPES } from "./types";
import { IConfigService } from "../../config/service";

export interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
}
export interface IDatabaseService {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  userSchema: ISchema;
  userModel: Model<IUserModel>;
}

@injectable()
export class DatabaseService implements IDatabaseService {
  private database;
  userSchema: ISchema;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    this.database = mongoose;
    this.logger = logger;

    this.userSchema = new Schema<IUserModel>({
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      name: { type: String },
    });
  }

  get userModel(): Model<IUserModel> {
    return model("User", this.userSchema);
  }

  async connect(): Promise<void> {
    try {
      await this.database.connect(this.configService.get("DB_URL"));
      this.logger.log(`[database] connect`);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`[database] disconnect: ${error.message}`);
      }
    }
  }
  async disconnect(): Promise<void> {
    await this.database.disconnect();
  }
}
