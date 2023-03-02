import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/schemas/users.schema';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getUsersByJournalId(@Param('id') id: string): Promise<User[]> {
    return this.usersService.getUsersByJournalId(id);
  }
}
