import { getCustomRepository, Repository } from 'typeorm';
import Settings from '../entities/Settings';
import SettingsRepository from '../repositories/SettingsRepository';
import { AppError } from '../shared/errors/AppError';

interface IRequest {
  username: string;
  chat: boolean;
}
export default class CreateSettingsService {
  private settingsRepository: Repository<Settings>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }
  public async execute({ username, chat }: IRequest): Promise<Settings> {
    const userNameExists = await this.settingsRepository.findOne({
      username,
    });

    if (userNameExists) {
      throw new AppError('The username is already in use..');
    }
    const settings = this.settingsRepository.create({
      chat,
      username,
    });
    await this.settingsRepository.save(settings);

    return settings;
  }
}
