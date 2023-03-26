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
    limit: number,
    greatOrder: number,
    lessOrder: number,
  ): Promise<MessagesResponse> {
    const allData = await this.messagesModel.where({
      journalId: id,
      status: undefined,
    });
    let lastOrder = 0;
    const count = allData.length;
    if (count > 0) lastOrder = Math.max(...allData.map((elem) => elem.order));
    const data = await this.messagesModel
      .find({
        journalId: id,
        status: undefined,
        order: { $gt: greatOrder, $lt: lessOrder },
      })
      .sort({ date: -1 })
      .limit(limit);
    return { data: data, count: count, order: lastOrder };
  }

  async getHistoryMessagesByJournalId(
    id: string,
    limit: number,
    greatOrder: number,
    lessOrder: number,
  ): Promise<MessagesResponse> {
    const allData = await this.messagesModel.where({
      journalId: id,
      status: { $ne: undefined },
    });
    let lastOrder = 0;
    const count = allData.length;
    if (count > 0) lastOrder = Math.max(...allData.map((elem) => elem.order));
    const data = await this.messagesModel
      .find({
        journalId: id,
        status: { $ne: undefined },
        order: { $gt: greatOrder, $lt: lessOrder },
      })
      .sort({ date: -1 })
      .limit(limit);
    return { data: data, count: count, order: lastOrder };
  }
}
