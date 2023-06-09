import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMassage } from '../../interfaces/error';
import handleValidationError from '../../Erros/handleValidationError';
import { ZodError } from 'zod';
import ApiError from '../../Erros/ApiError';
import { errorLogger } from '../../shared/logger';
import handleZodError from '../../Erros/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMassage[] = [];

  config.env === 'developemnt'
    ? console.log('globalErrorHandler -', error)
    : errorLogger.error('globalErrorHandler -', error);

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message as string;
    errorMessages = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message as string;
    errorMessages = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
