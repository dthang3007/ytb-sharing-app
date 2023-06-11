import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { NOTIFICATION_QUEUE } from 'src/constant';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: NOTIFICATION_QUEUE,
    }),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
