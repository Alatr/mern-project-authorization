import { Logger } from "tslog";
import { ILogger } from "./../backend/services/logger";
import { TYPES } from "./../backend/common/types";
import { inject, injectable } from "inversify";
import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";

export interface IConfigService {
  get: (key: string) => string;
}

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      this.logger.error("[ConfigService] .env key error");
    } else {
      this.logger.log("[ConfigService] download");
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
