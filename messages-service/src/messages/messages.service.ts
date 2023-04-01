import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { io, Socket } from 'socket.io-client';
import { Message, MessagesDocument } from 'src/schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  public socketClient: Socket;

  constructor(
    @InjectModel(Message.name) private messagesModel: Model<MessagesDocument>,
  ) {
    this.socketClient = io('http://localhost:3003');
  }

  onModuleInit() {
    this.socketClient.on('connect', () => {
      console.log('Connected');
    });
  }

  async createMessage(dto: CreateMessageDto) {
    const message = new this.messagesModel({
      ...dto,
      date: new Date(),
    });
    await message.save();

    const messageObj: Message = {
      ...dto,
      _id: message._id,
      date: message.date,
    };

    this.socketClient.emit('newMessage', messageObj);
    return 'Created message with id: ' + message._id;
  }
}
