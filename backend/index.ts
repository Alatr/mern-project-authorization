import { ILogger, LoggerService } from "./services/logger";
import { App } from "./app";
import { UserController } from "./users/controller";
import { ExceptionFilter, IExceptionFilter } from "../errors/exception.filter";
import { Container } from "inversify";
import { TYPES } from "./common/types";

// const logger: LoggerService = new LoggerService();
// const app = new App(
//   logger,
//   new UserController(logger),
//   new ExceptionFilter(logger)
// );
const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);

app.init();

export { app, appContainer };
