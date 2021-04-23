import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UserService } from '../services/CreateUserService';
import { CreateMessageService } from '../services/CreateMessageService';

interface IParams {
  email: string;
  text: string;
}
io.on('connect', socket => {
  const connectionsService = new ConnectionsService();
  const usersService = new UserService();
  const messageService = new CreateMessageService();

  socket.on('client_first_access', async params => {
    const socket_id = socket.id;

    const { text, email } = params as IParams;
    // eslint-disable-next-line prefer-const
    let user_id = null;

    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const user = await usersService.create(email);
      await connectionsService.create({
        socket_id,
        user_id: userExists.id,
      });
      user_id = user.id;
    } else {
      user_id = userExists.id;
      const connection = await connectionsService.findByUserId(userExists.id);
      if (!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;

        await connectionsService.create(connection);
      }
    }

    await messageService.create({
      text,
      user_id,
    });
  });
});
