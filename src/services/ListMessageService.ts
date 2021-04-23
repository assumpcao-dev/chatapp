import { getCustomRepository } from 'typeorm';
import { MessageRepository } from '../repositories/MessageRepository';

class ListMessageService {
  private messageRepository: MessageRepository;
  constructor() {
    this.messageRepository = getCustomRepository(MessageRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async listByUser(user_id: string) {
    const list = this.messageRepository.find({
      where: { user_id },
      relations: ['user'],
    });
    return list;
  }
}
export { ListMessageService };
