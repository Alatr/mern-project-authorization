import { LoggerService } from "./services/logger";
import { App } from "./app";
import { UserController } from "./users/controller";
import { ExceptionFilter } from "../errors/exception.filter";

async function init() {
  const logger: LoggerService = new LoggerService();
  const app = new App(
    logger,
    new UserController(logger),
    new ExceptionFilter(logger)
  );
  await app.init();
}

init();
