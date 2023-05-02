import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateLabDto } from './dto/create-lab.dto';
import { KafkaMessageDto } from './dto/kafka-message.dto';
import { LabsService } from './labs.service';
import { DeleteKafkaMessageDto } from './dto/delete-kafka-message.dto';

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

      await this.labsService.createLab(dto);
    }
  }

  @MessagePattern('delete-message')
  async deleteLab(@Payload() data: DeleteKafkaMessageDto) {
    await this.labsService.deleteLab(data);
  }
}
