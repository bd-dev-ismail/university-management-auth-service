import { Model } from 'mongoose';

export type academicSemisterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemisterTitles = 'Autumn' | 'Fall' | 'Summer';
export type IAcademicSemisterCodes = '01' | '02' | '03';

export type IAcademicSemister = {
  title: IAcademicSemisterTitles;
  year: string;
  code: IAcademicSemisterCodes;
  startMonth: academicSemisterMonth;
  endMonth: academicSemisterMonth;
};

export type AcademicSemisterModel = Model<IAcademicSemister>;

export type IAcademicSemisterFilter = { searchTerm?: string };
