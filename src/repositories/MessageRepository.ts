import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';

@EntityRepository(Message)
class MessageRepository extends Repository<Message> {
  async findById(id: string): Promise<Message | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });
    return user;
  }
}

export { MessageRepository };
