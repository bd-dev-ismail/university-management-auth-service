import { Schema, model } from 'mongoose';
import {
  IAcademicSemister,
  AcademicSemisterModel,
} from './academicSemister.interface';
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant';
import ApiError from '../../../Erros/ApiError';
import httpStatus from 'http-status';
const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: { type: String, required: true, enum: academicSemisterTitles },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemisterCodes },
    startMonth: { type: String, required: true, enum: academicSemisterMonths },
    endMonth: { type: String, required: true, enum: academicSemisterMonths },
  },
  {
    timestamps: true,
  }
);

academicSemisterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semister is already exist !'
    );
  }
  next();
});

export const AcademicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema
);
