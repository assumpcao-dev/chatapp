import Router from 'express';
import { SettingsController } from './controllers/SettingsController';
const routes = Router();

const settingsService = new SettingsController();

routes.post('/settings', settingsService.create);

export { routes };
