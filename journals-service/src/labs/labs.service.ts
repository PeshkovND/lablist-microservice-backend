import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lab, LabsDocument } from 'src/schemas/labs.schema';
import { CreateLabDto } from './dto/create-lab.dto';

@Injectable()
export class LabsService {
  constructor(@InjectModel(Lab.name) private labsModel: Model<LabsDocument>) {}

  async createLab(dto: CreateLabDto): Promise<string> {
    const allLabs = await this.labsModel.find();
    const requestedLab = allLabs.find(
      (elem) =>
        elem.num === dto.num &&
        elem.userId === dto.userId &&
        elem.journalId === dto.journalId,
    );
    if (requestedLab) {
      await this.labsModel.updateOne(
        { _id: requestedLab._id },
        {
          $set: {
            ...dto,
          },
        },
      );
      await this.labsModel.findOne({ _id: requestedLab._id });
      return 'Updated lab with id: ' + requestedLab._id;
    }
    const lab = new this.labsModel(dto);
    await lab.save();
    return 'Created lab with id: ' + lab._id;
  }
}
