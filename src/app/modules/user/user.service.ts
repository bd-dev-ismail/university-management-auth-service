import mongoose from 'mongoose';
import ApiError from '../../../Erros/ApiError';
import config from '../../../config/index';
import { AcademicSemister } from '../academicSemister/academicSemister.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { genrateStudentId } from './user.utlis';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //need defalut password
  if (!user.password) {
    user.password = config.default_student_password as string; //using type aias for password must be string
  }
  //set role
  user.role = 'student';

  const academicSemister = await AcademicSemister.findById(
    student.academicSemester
  );
  //genrate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await genrateStudentId(academicSemister);
    user.id = id;
    //same id for student
    student.id = id;

    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }
    //set student _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  //user --> studetent =--> academicSemsiter , academicerDepartment ,academicSemsiter
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemsiter',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
};
