import { EntityRepository, Repository } from 'typeorm';
import Settings from '../entities/Settings';

@EntityRepository(Settings)
export default class SettingsRepository extends Repository<Settings> {
  async findByUserName(username: string): Promise<Settings | undefined> {
    const user = await this.findOne({
      where: {
        username,
      },
    });
    return user;
  }
}
