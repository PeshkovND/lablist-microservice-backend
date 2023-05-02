import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessageDto } from './dto/kafka-message.dto';
import { LabsService } from './labs.service';
import { DeleteKafkaMessageDto } from './dto/delete-kafka-message.dto';

@Controller()
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @MessagePattern('create-mark')
  async createLab(@Payload() data: KafkaMessageDto) {
    if (data.status) {
      await this.labsService.createLab(data);
    }
  }

  @MessagePattern('delete-mark')
  async deleteLab(@Payload() data: DeleteKafkaMessageDto) {
    await this.labsService.deleteLab(data);
  }
}
