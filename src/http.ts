import 'reflect-metadata';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import path from 'path';

import 'dotenv/config';
import './database';
import { AppError } from './shared/errors/AppError';
import { routes } from './settings.routes';
import { userRoutes } from './user.routes';
import { messageRouter } from './message.routes';

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
// app.engine('html', require('ejs').renderFile);
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  // console.log('Connected: ', socket.id);
});

app.use(cors());
app.use(express.json());
app.use(errors());

app.use(routes);
app.use(userRoutes);
app.use(messageRouter);

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html');
});

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
export { http, io };
