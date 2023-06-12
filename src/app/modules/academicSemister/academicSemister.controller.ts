import { Request, Response } from 'express';

import { AcademicSemisterService } from './academicSemister.servic';
import catchAsync from '../../../shared/catchAsync';
import sendResponses from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/patination';
import { IAcademicSemister } from './academicSemister.interface';
import { academicSemisterFilterAbleFileds } from './academicSemister.constant';

const createSemister = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemsiterData } = req.body;
  const result = await AcademicSemisterService.createSemister(
    academicSemsiterData
  );

  //response with replace
  sendResponses(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semsiter created successfully!',
    data: result,
  });
});

const getAllSemister = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemisterFilterAbleFileds);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemisterService.getAllSemisters(
    filters,
    paginationOptions
  );
  //response with replace
  sendResponses<IAcademicSemister[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister retirieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemisterService.getSingleSemister(id);
  sendResponses<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister retirieved successfully',

    data: result,
  });
});

const updateSemister = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicSemisterService.updateSemsister(id, updateData);
  sendResponses<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister Updated successfully',

    data: result,
  });
});
const deleteSemsiter = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemisterService.deleteSemister(id);
  sendResponses<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semister Delated successfully',

    data: result,
  });
});

export const AcademicSemiserController = {
  createSemister,
  getAllSemister,
  getSingleSemister,
  updateSemister,
  deleteSemsiter,
};
