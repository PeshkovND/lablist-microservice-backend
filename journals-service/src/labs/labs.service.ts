import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { io, Socket } from 'socket.io-client';
import { Lab, LabsDocument } from 'src/schemas/labs.schema';
import { CreateLabDto } from './dto/create-lab.dto';
import { DeleteKafkaMessageDto } from './dto/delete-kafka-message.dto';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaMessageDto } from './dto/kafka-message.dto';

@Injectable()
export class LabsService {
  public socketClient: Socket;

  constructor(
    @Inject('JOURNAL_MICROSERVICE') private readonly journalClient: ClientKafka,
    @InjectModel(Lab.name) private labsModel: Model<LabsDocument>,
  ) {
    this.socketClient = io('http://localhost:3002');
  }

  async onModuleInit() {
    this.socketClient.on('connect', () => {
      console.log('Connected');
    });
    await this.journalClient.connect();
  }

  async createLab(dto: KafkaMessageDto): Promise<string> {
    const data: CreateLabDto = {
      num: dto.num,
      journalId: dto.journalId,
      score: dto.score,
      status: dto.status,
      userId: dto.userId,
      version: dto.version,
      dateOfCreation: dto.date,
    };
    const requestedLab = await this.labsModel.findOne({
      num: data.num,
      userId: data.userId,
      journalId: data.journalId,
    });
    if (requestedLab) {
      if (data.version <= requestedLab.version) return;
      await this.labsModel.updateOne(
        { _id: requestedLab.id },
        {
          $set: {
            ...data,
            isActual: true,
          },
        },
      );
      const labObj: Lab = {
        ...data,
        isActual: true,
        _id: requestedLab._id,
      };
      this.socketClient.emit('updateLab', labObj);
      this.journalClient.emit('create-message', JSON.stringify(dto));
      return 'Updated lab with id: ' + requestedLab._id;
    }
    const lab = new this.labsModel({ ...data, isActual: true });
    await lab.save();
    const labObj: Lab = {
      ...data,
      _id: lab._id,
      isActual: true,
    };
    this.socketClient.emit('newLab', labObj);
    this.journalClient.emit('create-message', JSON.stringify(dto));
    return 'Created lab with id: ' + lab._id;
  }

  async deleteLab(dto: DeleteKafkaMessageDto): Promise<string> {
    const requestedLab = await this.labsModel.findOne({ _id: dto._id });
    if (requestedLab) {
      if (dto.version <= requestedLab.version) return;
      await this.labsModel.updateOne(
        { _id: requestedLab.id },
        {
          $set: {
            ...dto,
            isActual: false,
          },
        },
      );
      const labObj: Lab = {
        _id: dto._id,
        num: requestedLab.num,
        status: requestedLab.status,
        score: requestedLab.score,
        userId: requestedLab.userId,
        journalId: requestedLab.journalId,
        dateOfCreation: requestedLab.dateOfCreation,
        version: dto.version,
        isActual: false,
      };

      this.socketClient.emit('updateLab', labObj);
      return 'Updated lab with id: ' + requestedLab._id;
    }
  }
}
