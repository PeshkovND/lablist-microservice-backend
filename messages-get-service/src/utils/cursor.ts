import { Message } from 'src/schemas/message.schema';
import { MessagesResponse } from 'src/types/messagesResponse';

export function encodeCursor(payload: any): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function decodeCursor<payloadType>(cursor: string): payloadType {
  return JSON.parse(Buffer.from(cursor, 'base64').toString()) as payloadType;
}

export function getDataWithAfterCursor(
  data: Message[],
  count: number,
  limit: number,
  cursorFields?: (keyof Message)[],
): MessagesResponse {
  const toReturn = (
    data: Message[],
    count: number,
    nextAfterCursor: string | null,
  ): MessagesResponse => ({
    data: data,
    count: count,
    afterCursor: nextAfterCursor,
  });

  let nextAfterCursor = null;

  const hasMore = data.length > limit;
  let lastElem: Message = null;
  if (hasMore) {
    lastElem = data.splice(data.length - 1, 1)[0];
  }

  if (data.length === 0) {
    return toReturn(data, count, nextAfterCursor);
  } else {
    if (hasMore) {
      if (cursorFields) {
        const cursorPayload: any = {};
        for (const field of cursorFields) {
          cursorPayload[field] = (lastElem as any)[field];
        }
        nextAfterCursor = encodeCursor({ ...cursorPayload });
      } else {
        nextAfterCursor = encodeCursor({ ...lastElem });
      }
    }
    return toReturn(data, count, nextAfterCursor);
  }
}
