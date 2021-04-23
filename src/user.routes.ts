import Router from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
const userRoutes = Router();
import { UserController } from './controllers/UserController';

const usersController = new UserController();

userRoutes.post('/users', usersController.create);

export { userRoutes };
