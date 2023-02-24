import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @EventPattern('create-message')
  createMessage(@Payload() data: CreateMessageDto) {
    this.messagesService.createMessage(data);
  }
}
