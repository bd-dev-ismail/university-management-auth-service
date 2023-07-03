import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponses from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loignUser(loginData);

  sendResponses(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login successfully',
    data: result,
  });
});

export const AuthController = { loginUser };

//login --> change password -> needsPasswordChanges --> true/false --> true --> chnage korlse false
