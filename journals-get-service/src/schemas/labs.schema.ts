import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LabsDocument = Lab & Document;

@Schema()
export class Lab {
  _id: string;

  @Prop({ required: true })
  readonly num: number;

  @Prop({ required: true })
  readonly status: string;

  @Prop({ required: true })
  readonly score: number;

  @Prop({ required: true })
  readonly userId: string;

  @Prop({ required: true })
  readonly journalId: string;
}

export const LabsSchema = SchemaFactory.createForClass(Lab);
