import { getCustomRepository } from 'typeorm';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionsRepository: ConnectionsRepository;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create({ socket_id, admin_id, user_id, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      socket_id,
      admin_id,
      user_id,
      id,
    });

    await this.connectionsRepository.save(connection);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async findByUserId(user_id: string) {
    const connection = this.connectionsRepository.findOne({
      user_id,
    });

    return connection;
  }
}

export { ConnectionsService };
