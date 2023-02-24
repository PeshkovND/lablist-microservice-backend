import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { JournalController } from './journals.controller';
import { JournalService } from './journals.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'JOURNAL_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
          client: {
            clientId: 'journal',
            brokers: ['localhost:9092'],
          },
          producerOnlyMode: true,
          consumer: {
            allowAutoTopicCreation: true,
            groupId: 'journal-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
