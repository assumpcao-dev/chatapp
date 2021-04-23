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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findByUseName(request: Request, response: Response) {
    const { username } = request.params;

    const settingServices = new CreateSettingsService();

    const settings = await settingServices.findByUserName(username);

    return response.json(settings);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;
    const settingsServices = new CreateSettingsService();
    const settings = await settingsServices.update(username, chat);
    return response.json(settings);
  }
}
