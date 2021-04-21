import { getCustomRepository } from 'typeorm';
import { Settings } from '../entities/Settings';
import { SettingsRepository } from '../repositories/SettingsRepository';
import AppError from '../shared/errors/AppError';

interface IRequest {
  username: string;
  chat: boolean;
}
class CreateSettingsService {
  public async execute({ username, chat }: IRequest): Promise<Settings> {
    const settingsRepository = getCustomRepository(SettingsRepository);
    const userNameExists = await settingsRepository.findByUserName(username);

    if (userNameExists) {
      throw new AppError('The username already exists');
    }
    const settings = settingsRepository.create({
      chat,
      username,
    });
    await settingsRepository.save(settings);

    return settings;
  }
}

export { CreateSettingsService };
