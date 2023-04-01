import { Controller, Get, Param } from '@nestjs/common';
import { LabsService } from 'src/labs/labs.service';
import { Journal } from 'src/schemas/journals.schema';
import { Lab } from 'src/schemas/labs.schema';
import { JournalsService } from './journals.service';

@Controller('journals')
export class JournalsController {
  constructor(
    private readonly journalsService: JournalsService,
    private readonly labsService: LabsService,
  ) {}

  @Get()
  async getAllJournals(): Promise<Journal[]> {
    return this.journalsService.findAll();
  }

  @Get(':id')
  async getOneJournal(@Param('id') id: string): Promise<Journal> {
    return this.journalsService.findOne(id);
  }

  @Get(':id/labs')
  async getLabsByJournalId(@Param('id') id: string): Promise<Lab[]> {
    return this.labsService.getLabsByJournalId(id);
  }
}
