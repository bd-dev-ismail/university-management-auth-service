import config from '../../../config/index'
import { IUser } from './users.interface'
import { User } from './users.model'
import { genrateUserId } from './users.utlis'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto genrated incremental id
  const id = await genrateUserId()
  user.id = id
  //need defalut password
  if (!user.password) {
    user.password = config.default_user_password as string //using type aias for password must be string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to create user')
  }
  return createdUser
}

export default {
  createUser,
}
