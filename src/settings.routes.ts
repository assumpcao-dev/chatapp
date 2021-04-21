import Router from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SettingsController from './controllers/SettingsController';
const routes = Router();

const settingsService = new SettingsController();

routes.post(
  '/settings',
  celebrate({
    [Segments.BODY]: {
      chat: Joi.boolean(),
      username: Joi.string().required(),
    },
  }),
  settingsService.create,
);

export { routes };
