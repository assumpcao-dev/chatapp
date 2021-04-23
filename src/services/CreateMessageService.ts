import { getCustomRepository } from 'typeorm';
import { MessageRepository } from '../repositories/MessageRepository';

interface IRequest {
  admin_id?: string;
  text: string;
  user_id: string;
}
class CreateMessageService {
  private messagesRepository: MessageRepository;

  constructor() {
    this.messagesRepository = getCustomRepository(MessageRepository);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create({ admin_id, text, user_id }: IRequest) {
    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id,
    });

    await this.messagesRepository.save(message);
    return message;
  }
}

export { CreateMessageService };
