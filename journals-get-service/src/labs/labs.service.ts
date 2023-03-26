import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lab, LabsDocument } from 'src/schemas/labs.schema';

@Injectable()
export class LabsService {
  constructor(@InjectModel(Lab.name) private labsModel: Model<LabsDocument>) {}

  async findAll(): Promise<Lab[]> {
    return await this.labsModel.find();
  }

  async getLabsByJournalId(id: string, order: number): Promise<Lab[]> {
    return await this.labsModel.find({ journalId: id, order: { $gt: order } });
  }
}
