import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from 'src/gateway/gateway.module';
import configuration from './config/configuration';
import { MongooseConfigService } from './config/MongooseConfigService';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MessagesModule,
    GatewayModule,
  ],
})
export class AppModule {}
