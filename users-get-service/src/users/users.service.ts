import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from 'src/schemas/users.schema';
import { Journal } from 'src/types/journal';
import fetch from 'node-fetch';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) {}

  async getUsersByJournalId(id: string): Promise<User[]> {
    const response = await fetch(process.env.GET_JOURNAL_SERVER_LINK + id);
    if (!response.ok) {
      throw new Error('Error');
    }
    const journal = (await response.json()) as Journal;
    return await this.usersModel.find({ _id: { $in: journal.students } });
  }
}
