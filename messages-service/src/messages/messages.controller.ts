import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMessageDto } from './dto/create-message.dto';
import { KafkaMessageDto } from './dto/kafka-message.dto';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @MessagePattern('create-message')
  async createMessage(@Payload() data: KafkaMessageDto) {
    const dto: CreateMessageDto = {
      num: data.num,
      userId: data.userId,
      journalId: data.journalId,
      text: data.text,
      status: data.status,
      date: data.date,
    };
    const result = await this.messagesService.createMessage(dto);
    console.log(result);
  }
}
