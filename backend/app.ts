import { ExceptionFilter } from "./../errors/exception.filter";
import { UserController } from "./users/controller";
import { ILogger } from "./services/logger";
import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response, Express } from "express";
// // import cors from 'cors';
// // import cookieParser from 'cookie-parser';
// // import mongoose from 'mongoose';
// // import router from './router/index.js';
// import errorMiddleware from './middlewares/error-middleware.js';

const PORT = process.env.PORT || 5002;
// const app = express();

// // app.use(express.json());
// // app.use(cookieParser());
// // app.use(cors());
// // app.use('/api', router);
// // app.use(errorMiddleware);
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(404);
// });
// // mongoose.connection.on('connected', () => {
// //   console.log('Mongoose is connected!!!!');
// // });
// console.log(PORT);

// export const appInit = async (logger: LoggerService) => {
//   try {
//     // await mongoose.connect(process.env.DB_URL, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     // });

//     app.listen(PORT, () =>
//       logger.log(`Server started on PORT: ${PORT} http://localhost:${PORT}`)
//     );
//   } catch (error) {
//     console.log(`Start error: ${error}`);
//   }
// };

export class App {
  app: Express;
  port: number;
  logger: ILogger;
  userController: UserController;
  exceptionFilter: ExceptionFilter;

  constructor(
    logger: ILogger,
    userController: UserController,
    exceptionFilter: ExceptionFilter
  ) {
    this.app = express();
    this.port = Number(process.env.PORT) || 5002;
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
      this.logger.log(
        `Server started on PORT: ${PORT} http://localhost:${PORT}`
      )
    );
  }
}
