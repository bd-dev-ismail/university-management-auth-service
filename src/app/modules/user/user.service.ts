import ApiError from '../../../Erros/ApiError';
import config from '../../../config/index';
import { IUser } from './user.interface';
import { User } from './user.model';
import { genrateUserId } from './user.utlis';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto genrated incremental id
  const id = await genrateUserId();
  user.id = id;
  //need defalut password
  if (!user.password) {
    user.password = config.default_user_password as string; //using type aias for password must be string
  }

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
