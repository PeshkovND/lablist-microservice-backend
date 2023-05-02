import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from 'src/schemas/users.schema';
import { Journal } from 'src/types/journal';
import { fetchHttp } from 'src/utils/fetchHttp';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) {}

  async getUsersByJournalId(id: string): Promise<User[]> {
    const journal = await fetchHttp<Journal>(
      process.env.GET_JOURNAL_SERVER_LINK + id,
    );
    if (!journal) {
      throw new Error('Journal not found');
    }
    return await this.usersModel
      .find({ _id: { $in: journal.students } })
      .sort({ surname: 1, name: 1 });
  }
}
