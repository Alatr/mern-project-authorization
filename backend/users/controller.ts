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
import { sign } from "jsonwebtoken";
import { IConfigService } from "../../config/service";
import { GuardMiddleware } from "../middlewares/guard";

export interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
}
@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.IUserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService
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
      {
        path: "/info",
        method: "get",
        func: this.info,
        middleware: [new GuardMiddleware()],
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
    const jwt = await this.signJWT(
      body.email,
      this.configService.get("JWT_SECRET")
    );
    this.ok(res, { jwt });
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
  async info(
    { user }: Request<{}, {}, UserRegistrationDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = await this.userService.getInfo(user);
    this.ok(res, { email: result?.email, id: result?.id });
  }

  private signJWT(email: string, secret: string): Promise<string> {
    return new Promise<string>((res, rej) => {
      sign(
        { email, iat: Math.floor(Date.now()) },
        secret,
        { algorithm: "HS256" },
        (err, token) => {
          if (err) {
            rej(err);
          }
          res(token as string);
        }
      );
    });
  }
}
