import { Injectable } from '@nestjs/common';
import { CreateLabDto } from './dto/create-lab.dto';

@Injectable()
export class LabsService {
  createLab(data: CreateLabDto) {
    console.log('Lab created');
  }
}
