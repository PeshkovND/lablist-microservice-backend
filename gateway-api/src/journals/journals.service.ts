import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateLabMessageDto } from './dto/create-lab-message.dto';
import { DeleteLabMessageDto } from './dto/delete-lab-message.dto';

@Injectable()
export class JournalService {
  constructor(
    @Inject('GATEWAY_MICROSERVICE') private readonly journalClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.journalClient.connect();
  }

  createLab(data: CreateLabMessageDto) {
    this.journalClient.emit('create-mark', JSON.stringify(data));
  }

  deleteLab(data: DeleteLabMessageDto) {
    this.journalClient.emit('delete-mark', JSON.stringify(data));
  }
}
