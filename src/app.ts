import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
// import { errors } from 'celebrate';
import 'dotenv/config';
import './database';
import AppError from './shared/errors/AppError';

import { routes } from './settings.routes';
const app = express();
app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(process.env.PORT, () =>
  console.log('Server running on port: ' + process.env.PORT),
);
