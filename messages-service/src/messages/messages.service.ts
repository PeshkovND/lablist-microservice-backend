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
    const allMessages = await this.messagesModel
      .find({ journalId: dto.journalId })
      .sort({ order: -1 });
    let lastOrder = 0;
    if (allMessages.length !== 0) {
      lastOrder = allMessages[0].order + 1;
    }
    const message = new this.messagesModel({
      ...dto,
      date: new Date(),
      order: lastOrder,
    });
    await message.save();
    return 'Created message with id: ' + message._id;
  }
}
