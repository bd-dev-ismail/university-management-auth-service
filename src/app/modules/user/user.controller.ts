import { RequestHandler, Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponses from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { users } = req.body;
    const result = await UserService.createUser(users);

    sendResponses(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
};

//replace the response with sendResponse
// res.status(200).json({
//   success: true,
//   message: 'User created successfully!',
//   data: result,
// });
