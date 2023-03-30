import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Lab } from 'src/schemas/labs.schema';

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

  @SubscribeMessage('newLab')
  sendLab(@MessageBody() body: Lab) {
    this.server.emit('New Lab: ' + body.journalId, body);
  }

  @SubscribeMessage('updateLab')
  updateLab(@MessageBody() body: Lab) {
    this.server.emit('Update Lab: ' + body.journalId, body);
  }
}
