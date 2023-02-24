import { Module } from '@nestjs/common';
import { JournalModule } from './journals/journals.module';

@Module({
  imports: [JournalModule],
})
export class AppModule {}
