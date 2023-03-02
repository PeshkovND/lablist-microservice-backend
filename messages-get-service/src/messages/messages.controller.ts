import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Message } from 'src/schemas/message.schema';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(':id')
  async getMessagesByJournalId(
    @Param('id') id: Message['journalId'],
  ): Promise<Message[]> {
    return this.messagesService.getMessagesByJournalId(id);
  }
}
