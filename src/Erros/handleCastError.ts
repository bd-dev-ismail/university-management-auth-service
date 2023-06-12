import mongoose from 'mongoose';
import { IGenericErrorMassage } from '../interfaces/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMassage[] = [
    { path: error.path, message: 'Invalid Id' },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: ' Cast error: ',
    errorMessage: errors,
  };
};

export default handleCastError;
