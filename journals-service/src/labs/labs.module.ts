import { Module } from '@nestjs/common';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lab, LabsSchema } from 'src/schemas/labs.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lab.name, schema: LabsSchema }]),
    ClientsModule.register([
      {
        name: 'JOURNAL_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'journal',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'message-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [LabsController],
  providers: [LabsService],
})
export class LabsModule {}
