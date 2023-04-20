import { Body, Controller, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { JournalService } from './journals.service';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  createMessage(@Body() data: CreateMessageDto) {
    return this.journalService.createMessage(data);
  }

  @Post('delete')
  deleteMessage(@Body() data: DeleteMessageDto) {
    return this.journalService.deleteMessage(data);
  }
}
