import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "../common/base.controller";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {
    console.log(this.classToValidate);
  }

  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToClass(this.classToValidate, body);

    validate(instance).then((errors) => {
      console.log({ errors, instance, classToValidate: this.classToValidate });
      if (errors.length > 0) {
        res.status(422).send(errors);
      } else {
        next();
      }
    });
  }
}
