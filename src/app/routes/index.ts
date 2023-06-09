import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';

const router = express.Router();

const moduelsRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semister',
    route: AcademicSemisterRoutes,
  },
];

moduelsRoutes.forEach(route => router.use(route.path, route.route));

export default router;
