import { EntityRepository, Repository } from 'typeorm';
import { Settings } from '../entities/Settings';

@EntityRepository(Settings)
class SettingsRepository extends Repository<Settings> {
  async findByUserName(username: string): Promise<Settings | undefined> {
    const settings = await this.findOne({
      where: {
        username,
      },
    });
    return settings;
  }
}

export { SettingsRepository };
