import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Journal, JournalsDocument } from 'src/schemas/journals.schema';

@Injectable()
export class JournalsService {
  constructor(
    @InjectModel(Journal.name) private journalsModel: Model<JournalsDocument>,
  ) {}

  async findAll(name: string): Promise<Journal[]> {
    return await this.journalsModel.find({
      discription: { $regex: name, $options: 'i' },
    });
  }

  async findOne(id: string): Promise<Journal> {
    return await this.journalsModel.findOne({ _id: id });
  }
}
