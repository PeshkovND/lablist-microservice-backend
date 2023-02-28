import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessagesDocument } from 'src/schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messagesModel: Model<MessagesDocument>,
  ) {}

  async createMessage(dto: CreateMessageDto) {
    const message = new this.messagesModel({ ...dto, date: new Date() });
    await message.save();
    return 'Created message with id: ' + message._id;
  }
}
