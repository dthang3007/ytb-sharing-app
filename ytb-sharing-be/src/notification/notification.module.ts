import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'schema/notification.schema';
import { EMIT_NOTI_QUEUE } from 'src/constant';
import { NotificationConsumer } from './notification.consumer';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    BullModule.registerQueue({
      name: EMIT_NOTI_QUEUE,
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationConsumer, NotificationService],
})
export class NotificatoinModule {}
