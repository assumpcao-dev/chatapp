import Router from 'express';
import { MessagesController } from './controllers/MessagesController';

const messageRouter = Router();
const messageController = new MessagesController();

messageRouter.post('/messages', messageController.create);
messageRouter.get('/messages/:id', messageController.showByUser);

export { messageRouter };
