import { ILogger } from "./../services/logger";
import { NextFunction, Router, Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";

export interface IMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => void;
}
interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "delete" | "put" | "patch">;
  middleware?: IMiddleware[];
}

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
    this.logger = logger;
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type("application/json");
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send(res, 200, message);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const middleware = route.middleware?.map((el) => el.execute.bind(el));
      const handler = route.func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      this._router[route.method](route.path, pipeline);
    }
  }
}
