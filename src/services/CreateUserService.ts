import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../shared/errors/AppError';

class UserService {
  async create(email: string) {
    //Verificar se o usuário exist
    const usersRepository = getCustomRepository(UserRepository);

    const usersExists = await usersRepository.findByEmail(email);

    if (usersExists) {
      throw new AppError('The user already exists.');
    }

    const user = usersRepository.create({
      email,
    });
    await usersRepository.save(user);

    return user;
  }
}

export { UserService };
