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
    const requestedLab = await this.labsModel.findOne({
      num: dto.num,
      userId: dto.userId,
      journalId: dto.journalId,
    });
    if (requestedLab) {
      if (dto.version <= requestedLab.version) return;
      await this.labsModel.updateOne(
        { _id: requestedLab.id },
        {
          $set: {
            ...dto,
            isActual: true,
          },
        },
      );
      const labObj: Lab = {
        ...dto,
        isActual: true,
        _id: requestedLab._id,
      };
      this.socketClient.emit('updateLab', labObj);
      return 'Updated lab with id: ' + requestedLab._id;
    }

    const lab = new this.labsModel({ ...dto, isActual: true });
    await lab.save();
    const labObj: Lab = {
      ...dto,
      _id: lab._id,
      isActual: true,
    };
    this.socketClient.emit('newLab', labObj);
    return 'Created lab with id: ' + lab._id;
  }
}
