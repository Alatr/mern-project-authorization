import { LoggerService } from "./services/logger";
import { App } from "./app";
import { UserController } from "./users/controller";

async function init() {
  const logger: LoggerService = new LoggerService();
  const app = new App(logger, new UserController(logger));
  await app.init();
}

init();
