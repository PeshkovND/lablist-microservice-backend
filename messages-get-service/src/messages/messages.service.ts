import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessagesDocument } from 'src/schemas/message.schema';
import { MessagesResponse } from 'src/types/messagesResponse';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messagesModel: Model<MessagesDocument>,
  ) {}

  async getMessagesByJournalId(
    id: string,
    offset: number,
    limit: number,
  ): Promise<MessagesResponse> {
    const count = await this.messagesModel
      .where({ journalId: id, status: undefined })
      .count();
    const data = await this.messagesModel
      .find({
        journalId: id,
        status: undefined,
      })
      .sort({ date: -1 })
      .skip(offset)
      .limit(limit);
    return { data: data, count: count };
  }

  async getHistoryMessagesByJournalId(
    id: string,
    offset: number,
    limit: number,
  ): Promise<MessagesResponse> {
    const count = await this.messagesModel
      .where({ journalId: id, status: { $ne: undefined } })
      .count();
    const data = await this.messagesModel
      .find({
        journalId: id,
        status: { $ne: undefined },
      })
      .sort({ date: -1 })
      .skip(offset)
      .limit(limit);
    return { data: data, count: count };
  }
}
