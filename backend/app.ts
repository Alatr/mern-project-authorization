import { ExceptionFilter } from "./../errors/exception.filter";
import { UserController } from "./users/controller";
import { ILogger } from "./services/logger";
import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "./common/types";

// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';
// import router from './router/index.js';
// import errorMiddleware from './middlewares/error-middleware.js';

const PORT = Number(process.env.PORT) || 5002;
// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors());
// app.use('/api', router);
// app.use(errorMiddleware);

// mongoose.connection.on('connected', () => {
//   console.log('Mongoose is connected!!!!');
// });

// export const appInit = async () => {
//   try {
//     await mongoose.connect(process.env.DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     app.listen(PORT, () =>
//       logger.log(`Server started on PORT: ${PORT} http://localhost:${PORT}`)
//     );
//   } catch (error) {
//     console.log(`Start error: ${error}`);
//   }
// };

@injectable()
export class App {
  app: Express;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = PORT;
    this.logger = logger;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
  }

  useRoutes() {
    this.app.use(this.userController.router);
  }

  useExceptionFilter() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public init() {
    this.useRoutes();
    this.useExceptionFilter();
    this.app.listen(PORT, () =>
      this.logger.log(`Server started on http://localhost:${PORT}`)
    );
  }
}
