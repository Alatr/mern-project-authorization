import { ValidateMiddleware } from "./../middlewares/validate";
import { UserRegistrationDto } from "./dto/register";
import { UserLoginDto } from "./dto/login";
import { ILogger } from "./../services/logger";
import { BaseController } from "../common/base.controller";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../errors/http-error";
import { TYPES } from "../common/types";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IUserService } from "./service";

export interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
}
@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.IUserService) private userService: IUserService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/register",
        method: "post",
        func: this.register,
        middleware: [new ValidateMiddleware(UserRegistrationDto)],
      },
      {
        path: "/login",
        method: "post",
        func: this.login,
        middleware: [new ValidateMiddleware(UserLoginDto)],
      },
    ]);
  }

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ) {
    const result = await this.userService.validateUser(body);
    if (!result) {
      return next(new HTTPError(401, "auto error", "login"));
    }
    this.ok(res, result);
  }

  async register(
    { body }: Request<{}, {}, UserRegistrationDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = await this.userService.createUser(body);
    if (!result) {
      return next(new HTTPError(422, "user already exist"));
    }
    this.ok(res, result);
  }
}
