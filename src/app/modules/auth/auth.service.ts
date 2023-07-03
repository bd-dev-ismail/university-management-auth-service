import httpStatus from 'http-status';
import ApiError from '../../../Erros/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  //check user exist
  const isUserExist = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  ).lean();

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exits');
  }
  //match password
  const isPasswordMatch = await bcrypt.compare(password, isUserExist?.password);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  //create jwt token
  return {};
};

export const AuthService = {
  loginUser,
};
