import { Body, Controller, Post } from '@nestjs/common';
import { CreateLabMessageDto } from './dto/create-lab-message.dto';
import { JournalService } from './journals.service';
import { DeleteLabMessageDto } from './dto/delete-lab-message.dto';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  createMessage(@Body() data: CreateLabMessageDto) {
    return this.journalService.createLab(data);
  }

  @Post('delete')
  deleteMessage(@Body() data: DeleteLabMessageDto) {
    return this.journalService.deleteLab(data);
  }
}
