import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  createMessage(data: CreateMessageDto) {
    console.log('Message Created');
  }
}
