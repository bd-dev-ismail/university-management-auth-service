import { NextFunction, Request, Response } from 'express';

import { AcademicSemisterService } from './academicSemister.servic';
import catchAsync from '../../../shared/catchAsync';
import sendResponses from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemsiterData } = req.body;
    const result = await AcademicSemisterService.createSemister(
      academicSemsiterData
    );
    next();
    //response with replace
    sendResponses(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semsiter created successfully!',
      data: result,
    });
  }
);

export const AcademicSemiserController = {
  createSemister,
};
