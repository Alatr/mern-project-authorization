import { ILogger } from "./../services/logger";
import { BaseController } from "../common/base.controller";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../../errors/http-error";
import { TYPES } from "../common/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";

export interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
}
@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/register",
        method: "post",
        func: this.register,
      },
      {
        path: "/login",
        method: "post",
        func: this.login,
      },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    // this.ok(res, "login");
    next(new HTTPError(401, "auto error", "login"));
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }
}
