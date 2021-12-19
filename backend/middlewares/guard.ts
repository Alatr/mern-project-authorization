import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "../common/base.controller";

export class GuardMiddleware implements IMiddleware {
  constructor() {}

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      next();
    } else {
      res.status(401).send("Author error");
    }
  }
}
