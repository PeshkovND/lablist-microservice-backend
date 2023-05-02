import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JournalController } from './journals.controller';
import { JournalService } from './journals.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GATEWAY_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'gateway',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
