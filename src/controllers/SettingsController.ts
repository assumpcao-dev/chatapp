import { Request, Response } from 'express';
import { CreateSettingsService } from '../services/CreateSettingsService';

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body;

    const settingServices = new CreateSettingsService();

    const settings = await settingServices.execute({
      chat,
      username,
    });
    return response.json(settings);
  }
}

export { SettingsController };
