import { Body, Controller, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { JournalService } from './journals.service';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {
    console.log(new Date());
  }

  @Post()
  createMessage(@Body() data: CreateMessageDto) {
    return this.journalService.createMessage(data);
  }
}
