import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../shared/errors/AppError';

class UserService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UserRepository);
  }
  async create(email: string): Promise<User> {
    const usersExists = await this.usersRepository.findOne({
      email,
    });

    if (usersExists) {
      throw new AppError('The user already exists.');
    }

    const user = this.usersRepository.create({
      email,
    });
    await this.usersRepository.save(user);

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findByEmail(email: string) {
    const user = this.usersRepository.findOne({ email });

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findByUserId(user_id: string) {
    const user = this.usersRepository.findOne(user_id);

    return user;
  }
}

export { UserService };
