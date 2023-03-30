import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessagesDocument = Message & Document;

@Schema()
export class Message {
  readonly _id: string;

  @Prop({ required: true })
  readonly date: Date;

  @Prop({ required: false })
  readonly status?: string;

  @Prop({ required: true })
  readonly text: string;

  @Prop({ required: true })
  readonly journalId: string;

  @Prop({ required: true })
  readonly userId: string;

  @Prop({ required: true })
  readonly num: number;

  @Prop({ required: true })
  readonly order: number;
}

export const MessagesSchema = SchemaFactory.createForClass(Message);
