import { Request, Response } from 'express'
import userSevice from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { users } = req.body
    const result = await userSevice.createUser(users)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (errr) {
    res.status(400).json({
      success: false,
      message: 'Failed to create user',
    })
  }
}

export default {
  createUser,
}
