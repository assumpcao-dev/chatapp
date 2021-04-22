import { getCustomRepository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessageRepository } from '../repositories/MessageRepository';

class ListMessageService {
  async listByUser(user_id: string): Promise<Message[]> {
    const messageRepository = getCustomRepository(MessageRepository);

    const list = messageRepository.find({
      user_id,
    });
    return list;
  }
}
export { ListMessageService };
