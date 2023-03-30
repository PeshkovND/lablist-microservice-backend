import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from 'src/schemas/message.schema';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Connected with id: ' + socket.id);
    });
  }

  @SubscribeMessage('newMessage')
  sendMessage(@MessageBody() body: Message) {
    this.server.emit('Message: ' + body.journalId, body);
  }
}
