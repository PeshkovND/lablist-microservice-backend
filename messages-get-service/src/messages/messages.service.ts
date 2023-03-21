import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessagesDocument } from 'src/schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messagesModel: Model<MessagesDocument>,
  ) {}

  async getMessagesByJournalId(id: string): Promise<Message[]> {
    return await this.messagesModel.find({ journalId: id, status: undefined });
  }

  async getHistoryMessagesByJournalId(id: string): Promise<Message[]> {
    return await this.messagesModel
      .find({
        journalId: id,
        status: { $ne: undefined },
      })
      .sort({ date: -1 });
  }
}
