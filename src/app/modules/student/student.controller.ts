import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponses from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/patination';
import { IStudent } from './student.interface';
import { studentFilterAbleFileds } from './student.constant';
import { StudentService } from './student.service';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterAbleFileds);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudent(filters, paginationOptions);
  //response with replace
  sendResponses<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retirieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);
  sendResponses<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retirieved successfully',

    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await StudentService.updateStudent(id, updateData);
  sendResponses<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Updated successfully',

    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);
  sendResponses<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Delated successfully',

    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
