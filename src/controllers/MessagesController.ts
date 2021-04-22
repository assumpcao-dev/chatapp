import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';
import { ListMessageService } from '../services/ListMessageService';

class MessagesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { admin_id, user_id, text } = request.body;
    const messagesService = new CreateMessageService();

    const message = await messagesService.create({
      admin_id,
      user_id,
      text,
    });

    return response.json(message);
  }

  async showByUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listMessage = new ListMessageService();

    const message = await listMessage.listByUser(id);
    return response.json(message);
  }
}

export { MessagesController };
