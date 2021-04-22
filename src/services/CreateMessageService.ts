import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessageRepository } from '../repositories/MessageRepository';

interface IRequest {
  admin_id?: string;
  text: string;
  user_id: string;
}
class CreateMessageService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessageRepository);
  }
  async create({ admin_id, text, user_id }: IRequest): Promise<Message> {
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
