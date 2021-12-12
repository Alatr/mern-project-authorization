import { TYPES } from "./../backend/common/types";
import { ILogger } from "./../backend/services/logger";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "./http-error";
import { inject, injectable } from "inversify";
import "reflect-metadata";

export interface IExceptionFilter {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.logger = logger;
  }

  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[${err.context}]: Error ${err.statusCode}: ${err.message}`
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
