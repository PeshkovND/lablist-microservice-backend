import { Message } from 'src/schemas/message.schema';

export type MessagesResponse = {
  data: Message[];
  count: number;
  afterCursor: string | null;
};

export type MessageCursorType = {
  readonly _id: string;
  readonly date: Date;
};
