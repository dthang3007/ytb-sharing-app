import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EmitModule } from './emit/emit.module';
import { NotificatoinModule } from './notification/notification.module';
import { PrismaModule } from './prisma/prisma.module';
import { SocketGateway } from './socket/socket.gateway';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    PrismaModule,
    VideoModule,
    SocketGateway,
    NotificatoinModule,
    EmitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
