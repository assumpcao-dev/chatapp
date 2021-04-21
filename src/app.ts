import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';

import 'dotenv/config';
import './database';
import { AppError } from './shared/errors/AppError';
import { routes } from './settings.routes';
import { userRoutes } from './user.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(errors());

app.use(routes);
app.use(userRoutes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(process.env.PORT, () =>
  console.log('Server running on port: ' + process.env.PORT),
);
