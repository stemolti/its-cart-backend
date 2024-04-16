import { Request, Response, NextFunction } from "express";
import { ValidationError as OriginalValidationError } from "class-validator";
import { detail } from "../api/product/product.controller";
export class ValidationError extends Error{
  originalErrors: OriginalValidationError[]; 

  constructor(errors: OriginalValidationError[]){
    super();
    this.name = 'ValidationError';
    this.message = this.originalErrors.map(err => {
      return Object.values(err.constraints as any);
    }).join(';');
  }
}


export const validationErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
      res.status(400);
      res.json({
        error: err.name,
        message: err.message,
        details: err.originalErrors.map(e => ({
          property: e.property,
          constraints: e.constraints,
          value: e.value
        }))
      });
    } else {
      next(err);
    }
  }