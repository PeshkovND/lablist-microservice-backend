import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/MongooseConfigService';
import { LabsModule } from './labs/labs.module';
import configuration from './config/configuration';
import { JournalsModule } from './journals/journals.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    LabsModule,
    JournalsModule,
  ],
})
export class AppModule {}
