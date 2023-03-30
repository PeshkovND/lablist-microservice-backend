import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { io, Socket } from 'socket.io-client';
import { Lab, LabsDocument } from 'src/schemas/labs.schema';
import { CreateLabDto } from './dto/create-lab.dto';

@Injectable()
export class LabsService {
  public socketClient: Socket;

  constructor(@InjectModel(Lab.name) private labsModel: Model<LabsDocument>) {
    this.socketClient = io('http://localhost:3002');
  }

  onModuleInit() {
    this.socketClient.on('connect', () => {
      console.log('Connected');
    });
  }

  async createLab(dto: CreateLabDto): Promise<string> {
    const allLabs = await this.labsModel
      .find({ journalId: dto.journalId })
      .sort({ order: -1 });
    let lastOrder = 0;
    if (allLabs.length !== 0) {
      lastOrder = allLabs[0].order + 1;
    }
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
            order: lastOrder,
          },
        },
      );
      const labObj: Lab = {
        ...dto,
        _id: requestedLab._id,
        order: lastOrder,
      };
      this.socketClient.emit('updateLab', labObj);
      return 'Updated lab with id: ' + requestedLab._id;
    }
    const lab = new this.labsModel({ ...dto, order: lastOrder });
    await lab.save();
    const labObj: Lab = {
      ...dto,
      _id: lab._id,
      order: lastOrder,
    };
    this.socketClient.emit('newLab', labObj);
    return 'Created lab with id: ' + lab._id;
  }
}
