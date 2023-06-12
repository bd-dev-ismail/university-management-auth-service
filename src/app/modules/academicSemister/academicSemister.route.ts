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

router.get('/:id', AcademicSemiserController.getSingleSemister);

router.patch(
  '/:id',
  validateRequest(AcademicSemisterValidation.updateAcademicSemisterZodSchema),
  AcademicSemiserController.updateSemister
);
router.delete('/:id', AcademicSemiserController.deleteSemsiter);
router.get('/', AcademicSemiserController.getAllSemister);

export const AcademicSemisterRoutes = router;
