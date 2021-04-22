import { getCustomRepository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessageRepository } from '../repositories/MessageRepository';

interface IRequest {
  admin_id?: string;
  text: string;
  user_id: string;
}
class CreateMessageService {
  async create({ admin_id, text, user_id }: IRequest): Promise<Message> {
    const messagesRepository = getCustomRepository(MessageRepository);

    const message = messagesRepository.create({
      admin_id,
      text,
      user_id,
    });

    await messagesRepository.save(message);
    return message;
  }
}

export { CreateMessageService };
