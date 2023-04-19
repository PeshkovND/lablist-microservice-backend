import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateLabDto } from './dto/create-lab.dto';
import { KafkaMessageDto } from './dto/kafka-message.dto';
import { LabsService } from './labs.service';

@Controller()
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @MessagePattern('create-message')
  async createLab(@Payload() data: KafkaMessageDto) {
    if (data.status) {
      const dto: CreateLabDto = {
        num: data.num,
        journalId: data.journalId,
        score: data.score,
        status: data.status,
        userId: data.userId,
        version: data.version,
        dateOfCreation: data.date,
      };

      const result = await this.labsService.createLab(dto);
      console.log(result);
    }
  }
}
