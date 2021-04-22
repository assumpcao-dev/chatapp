import { EntityRepository, Repository } from 'typeorm';
import Settings from '../entities/Settings';

@EntityRepository(Settings)
export default class SettingsRepository extends Repository<Settings> {}
