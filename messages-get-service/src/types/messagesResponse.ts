import { Message } from 'src/schemas/message.schema';

export type MessagesResponse = {
  data: Message[];
  count: number;
};
