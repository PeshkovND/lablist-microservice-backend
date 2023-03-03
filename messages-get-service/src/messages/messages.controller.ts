import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Message } from 'src/schemas/message.schema';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id/messages')
  async getMessagesByJournalId(
    @Param('id') id: Message['journalId'],
  ): Promise<Message[]> {
    return this.messagesService.getMessagesByJournalId(id);
  }

  @Get(':id/history')
  async getHistoryMessagesByJournalId(
    @Param('id') id: Message['journalId'],
  ): Promise<Message[]> {
    return this.messagesService.getHistoryMessagesByJournalId(id);
  }
}
