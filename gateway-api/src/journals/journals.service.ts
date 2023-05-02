import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateMessageDto } from './dto/create-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Injectable()
export class JournalService {
  constructor(
    @Inject('JOURNAL_MICROSERVICE') private readonly journalClient: ClientKafka,
  ) {}

  createMessage(data: CreateMessageDto) {
    this.journalClient.emit('create-message', JSON.stringify(data));
  }

  deleteMessage(data: DeleteMessageDto) {
    this.journalClient.emit('delete-message', JSON.stringify(data));
  }
}
