import { ILogger, LoggerService } from "./services/logger";
import { App } from "./app";
import { IUserController, UserController } from "./users/controller";
import { ExceptionFilter, IExceptionFilter } from "./errors/exception.filter";
import { Container, ContainerModule, interfaces } from "inversify";
import { TYPES } from "./common/types";
import { UserService, IUserService } from "./users/service";
import { ConfigService, IConfigService } from "../config/service";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.IUserService).to(UserService);
  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
  bind<App>(TYPES.Application).to(App);
});

function init() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = init();
