import { Controller, Get } from '@nestjs/common';
import { Lab } from 'src/schemas/labs.schema';
import { LabsService } from './labs.service';

@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @Get()
  async getAllLabs(): Promise<Lab[]> {
    return this.labsService.findAll();
  }
}
