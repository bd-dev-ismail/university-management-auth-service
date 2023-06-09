import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMassage } from '../interfaces/error';
const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMassage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'validation error',
    errorMessage: errors,
  };
};

export default handleZodError;
