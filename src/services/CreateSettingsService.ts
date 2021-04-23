import { getCustomRepository } from 'typeorm';
import Settings from '../entities/Settings';
import SettingsRepository from '../repositories/SettingsRepository';
import { AppError } from '../shared/errors/AppError';

interface IRequest {
  username: string;
  chat: boolean;
}
export default class CreateSettingsService {
  private settingsRepository: SettingsRepository;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async execute({ username, chat }: IRequest) {
    const userNameExists = this.settingsRepository.findOne({
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
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findByUserName(username: string) {
    const settings = this.settingsRepository.findOne({
      username,
    });

    return settings;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async update(username: string, chat: boolean) {
    await this.settingsRepository
      .createQueryBuilder()
      .update(Settings)
      .set({
        chat,
      })
      .where('username = :username', { username })
      .execute();
  }
}
