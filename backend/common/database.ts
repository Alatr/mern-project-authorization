import { ILogger } from "./../services/logger";
import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { TYPES } from "./types";
import { IConfigService } from "../../config/service";

export interface IDatabaseService {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

@injectable()
export class DatabaseService implements IDatabaseService {
  private database;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    this.database = mongoose;
    this.logger = logger;
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
  async disconnect(): Promise<void> {}
}
