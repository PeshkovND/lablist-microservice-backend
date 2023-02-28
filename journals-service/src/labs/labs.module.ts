import { Module } from '@nestjs/common';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lab, LabsSchema } from 'src/schemas/labs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lab.name, schema: LabsSchema }]),
  ],
  controllers: [LabsController],
  providers: [LabsService],
})
export class LabsModule {}
