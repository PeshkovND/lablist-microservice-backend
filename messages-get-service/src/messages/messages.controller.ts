import { Controller, Get } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators';
import { Message } from 'src/schemas/message.schema';
import { MessagesResponse } from 'src/types/messagesResponse';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id/messages')
  async getMessagesByJournalId(
    @Param('id') id: Message['journalId'],
    @Query('cursor') cursor: string | undefined = undefined,
    @Query('limit') limit: number,
  ): Promise<MessagesResponse> {
    return this.messagesService.getMessagesByJournalId(id, cursor, limit);
  }

  @Get(':id/history')
  async getHistoryMessagesByJournalId(
    @Param('id') id: Message['journalId'],
    @Query('cursor') cursor: string | undefined = undefined,
    @Query('limit') limit: number,
  ): Promise<MessagesResponse> {
    return this.messagesService.getHistoryMessagesByJournalId(
      id,
      cursor,
      limit,
    );
  }
}
