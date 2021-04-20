import 'reflect-metadata';
import express, { Request, Response } from 'express';
import './database';

import AppError from './shared/errors/AppError';
import 'dotenv/config';

const app = express();
app.use(express.json());

app.use((error: Error, request: Request, response: Response) => {
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
});
app.listen(process.env.PORT, () =>
  console.log('Server running on port: ' + process.env.PORT),
);
