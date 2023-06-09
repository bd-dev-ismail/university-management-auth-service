import express from 'express';
// import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterValidation } from './academicSemisterValidation';
import { AcademicSemiserController } from './academicSemister.controller';
const router = express.Router();

router.post(
  '/create-semister',
  validateRequest(AcademicSemisterValidation.createAcademicSemisterZodSchema),
  AcademicSemiserController.createSemister
);

export const AcademicSemisterRoutes = router;
