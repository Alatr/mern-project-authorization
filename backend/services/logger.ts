import { Logger } from "tslog";

export interface ILogger {
  logger: unknown;
  log: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

export class LoggerService implements ILogger {
  public logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: "hidden",
      displayFunctionName: false,
    });
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }
  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
  error(...args: unknown[]) {
    this.logger.error(...args);
  }
}
