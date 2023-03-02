import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { MongooseConfigService } from './config/MongooseConfigService';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UsersModule,
  ],
})
export class AppModule {}
