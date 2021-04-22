import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessageRepository } from '../repositories/MessageRepository';

class ListMessageService {
  private messageRepository: Repository<Message>;
  constructor() {
    this.messageRepository = getCustomRepository(MessageRepository);
  }
  async listByUser(user_id: string): Promise<Message[]> {
    const list = this.messageRepository.find({
      where: { user_id },
      relations: ['user'],
    });
    return list;
  }
}
export { ListMessageService };
