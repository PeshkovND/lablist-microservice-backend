import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabsModule } from 'src/labs/labs.module';
import { Journal, JournalsSchema } from 'src/schemas/journals.schema';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Journal.name, schema: JournalsSchema }]),
    LabsModule,
  ],
  controllers: [JournalsController],
  providers: [JournalsService],
})
export class JournalsModule {}
