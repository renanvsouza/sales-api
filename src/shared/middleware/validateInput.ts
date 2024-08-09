import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateInput = (schema: Joi.ObjectSchema) => (request: Request, response: Response, next: NextFunction) => {
  const { error } = schema.validate(request.body, { abortEarly: false });
  if (error) {
    throw new AppError('Validation failed', 400, error.details);
  }
  next();
};

export default validateInput;
