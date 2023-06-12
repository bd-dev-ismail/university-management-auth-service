import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';

import routers from './app/routes';
import httpStatus from 'http-status';
// import ApiError from './Erros/ApiError'
const app: Application = express();

//using cors to allow
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application Routes
// console.log(process.env)
app.use('/api/v1', routers);
// app.use('/api/v1/users', UserRoutes);
// app.use('/api/v1/academic-semister', AcademicSemisterRoutes);

//testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   //   res.send('Working Successfully!')
//   throw new Error('Not Found')
//   //   next('Not Found')
//   //   Promise.reject(new Error('Unhandle Promise Rejection'))
//   //   console.log(x)
// })

//Global error handler function
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;
