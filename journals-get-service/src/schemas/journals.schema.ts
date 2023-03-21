import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JournalsDocument = Journal & Document;

export class JournalLab {
  num: number;
  deadline?: Date;
  name?: string;
}

@Schema()
export class Journal {
  _id: Types.ObjectId | string;

  @Prop({ required: true })
  labs: JournalLab[];

  @Prop()
  discription?: string;

  @Prop({ required: true })
  students: string[];
}

export const JournalsSchema = SchemaFactory.createForClass(Journal);
