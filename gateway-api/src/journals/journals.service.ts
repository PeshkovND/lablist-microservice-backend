import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class JournalService {
  constructor(
    @Inject('JOURNAL_MICROSERVICE') private readonly journalClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.journalClient.subscribeToResponseOf('create-message');

    await this.journalClient.connect();
  }

  createMessage(data: CreateMessageDto) {
    this.journalClient.emit('create-message', JSON.stringify(data));
  }
}
