import { Request, Response } from 'express';
import CreateSettingsService from '../services/CreateSettingsService';

export default class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body;

    const settingServices = new CreateSettingsService();

    const settings = await settingServices.execute({
      username,
      chat,
    });
    return response.json(settings);
  }
}
