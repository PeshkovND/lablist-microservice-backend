import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateLabDto } from './dto/create-lab.dto';
import { LabsService } from './labs.service';

@Controller()
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @EventPattern('create-journal')
  createLab(@Payload() data: CreateLabDto) {
    this.labsService.createLab(data);
  }
}
