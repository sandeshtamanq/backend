import { NextFunction, Request, Response } from "express";
import { validationPipe, ValidationError } from "../pipes/validationPipe";

export const validationMiddleware = (validationSchema: any) => async (req: Request, res: Response, next: NextFunction) => {
  const results: any = await validationPipe(validationSchema, { ...req.body, ...req.params });

  if (results.length > 0) {
    let errors: any = [];
    results.forEach((result: ValidationError) => {
      const error: any = result.constraints;
      errors = [...errors, ...Object.values(error)];
    });

    return res.status(400).json({
      status: 400,
      message: errors,
    });
  }

  next();
  return true;
};
