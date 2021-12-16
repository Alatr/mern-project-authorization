import { IDatabaseService } from "./common/database";
import { ConfigService, IConfigService } from "./../config/service";
import { ExceptionFilter, IExceptionFilter } from "./errors/exception.filter";
import { IUserController, UserController } from "./users/controller";
import { ILogger } from "./services/logger";
import express, { Express } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "./common/types";
import { json } from "body-parser";

// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';
// import router from './router/index.js';
// import errorMiddleware from './middlewares/error-middleware.js';

@injectable()
export class App {
  app: Express;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.DatabaseService) private databaseService: IDatabaseService
  ) {
    this.app = express();
    this.port = Number(this.configService.get("PORT")) || 1234;
    this.logger = logger;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
    this.configService = configService;
  }

  useMiddleware(): void {
    this.app.use(json());
  }

  useRoutes() {
    this.app.use(this.userController.router);
  }

  useExceptionFilter() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilter();
    await this.databaseService.connect();
    this.app.listen(this.port, () =>
      this.logger.log(`Server started on http://localhost:${this.port}`)
    );
  }
}
