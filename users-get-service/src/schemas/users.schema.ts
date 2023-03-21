import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UsersDocument = User & Document;

export class Contact {
  type: string;
  value: string;
}

@Schema()
export class User {
  _id: mongoose.Types.ObjectId | string;

  @Prop({ required: false })
  photo?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: false })
  contacts?: Contact[];

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
