import {
  IAcademicSemisterCodes,
  IAcademicSemisterTitles,
  academicSemisterMonth,
} from './academicSemister.interface';

export const academicSemisterCodes: IAcademicSemisterCodes[] = [
  '01',
  '02',
  '03',
];
export const academicSemisterTitles: IAcademicSemisterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemisterMonths: academicSemisterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemisterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
