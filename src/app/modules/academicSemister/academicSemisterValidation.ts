import { z } from 'zod';
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant';
const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemisterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: 'Start Month is Required',
    }),
    endMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: 'End Month is Required',
    }),
  }),
});
///to ensure for update we must need to give tittle & code for update title/code otherwise we can update all field without title/code change
const updateAcademicSemisterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemisterTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum([...academicSemisterCodes] as [string, ...string[]], {
          required_error: 'Code is required',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemisterMonths] as [string, ...string[]], {
          required_error: 'Start Month is Required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemisterMonths] as [string, ...string[]], {
          required_error: 'End Month is Required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title & code are required or neither',
    }
  );

export const AcademicSemisterValidation = {
  createAcademicSemisterZodSchema,
  updateAcademicSemisterZodSchema,
};
