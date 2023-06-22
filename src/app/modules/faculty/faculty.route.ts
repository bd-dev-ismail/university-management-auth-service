import express from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFaculties);

router.delete('/:id', FacultyController.deleteFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);

export const StudentRoutes = router;