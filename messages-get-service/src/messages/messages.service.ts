import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessagesDocument } from 'src/schemas/message.schema';
import {
  MessageCursorType,
  MessagesResponse,
} from 'src/types/messagesResponse';
import { decodeCursor, getDataWithAfterCursor } from 'src/utils/cursor';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messagesModel: Model<MessagesDocument>,
  ) {}

  async getMessagesByJournalId(
    id: string,
    cursor: string | undefined,
    limit: number,
  ): Promise<MessagesResponse> {
    const cursorBefore: MessageCursorType | undefined = cursor
      ? decodeCursor<MessageCursorType>(cursor)
      : undefined;

    let additionalFilter = {};
    if (cursorBefore) {
      additionalFilter = {
        date: { $lte: cursorBefore ? cursorBefore.date : '' },
        _id: { $lte: cursorBefore ? cursorBefore._id : '' },
      };
    }

    const count = await this.messagesModel
      .where({ journalId: id, status: undefined })
      .count();
    const data = await this.messagesModel
      .find({
        journalId: id,
        status: undefined,
        ...additionalFilter,
      })
      .sort({ date: -1, _id: -1 })
      .limit(Number(limit) + 1);

    const returningData = getDataWithAfterCursor(data, count, limit, [
      '_id',
      'date',
    ]);
    return returningData;
  }

  async getHistoryMessagesByJournalId(
    id: string,
    cursor: string | undefined,
    limit: number,
  ): Promise<MessagesResponse> {
    const cursorBefore: MessageCursorType | undefined = cursor
      ? decodeCursor<MessageCursorType>(cursor)
      : undefined;

    let additionalFilter = {};
    if (cursorBefore) {
      additionalFilter = {
        date: { $lte: cursorBefore ? cursorBefore.date : '' },
        _id: { $lte: cursorBefore ? cursorBefore._id : '' },
      };
    }

    const count = await this.messagesModel
      .where({ journalId: id, status: { $ne: undefined } })
      .count();
    const data = await this.messagesModel
      .find({
        journalId: id,
        status: { $ne: undefined },
        ...additionalFilter,
      })
      .sort({ date: -1, _id: -1 })
      .limit(Number(limit) + 1);

    const returningData = getDataWithAfterCursor(data, count, limit, [
      '_id',
      'date',
    ]);
    return returningData;
  }
}
