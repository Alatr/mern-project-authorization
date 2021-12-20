import { ILogger, LoggerService } from "./services/logger";
import { App } from "./app";
import { IUserController, UserController } from "./users/controller";
import { ExceptionFilter, IExceptionFilter } from "./errors/exception.filter";
import { Container, ContainerModule, interfaces } from "inversify";
import { TYPES } from "./common/types";
import { UserService, IUserService } from "./users/service";
import { ConfigService, IConfigService } from "../config/service";
import { IDatabaseService, DatabaseService } from "./common/database";
import { IUserRepository, UserRepository } from "./users/repository";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.IUserService).to(UserService);
  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
  bind<IDatabaseService>(TYPES.DatabaseService)
    .to(DatabaseService)
    .inSingletonScope();
  bind<IUserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope();
  bind<App>(TYPES.Application).to(App);
});

async function init(): Promise<{
  appContainer: Container;
  app: App;
}> {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  await app.init();
  return { appContainer, app };
}

export const boot = init();
