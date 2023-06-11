import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, Queue } from 'bull';
import { Model } from 'mongoose';
import { Notification } from 'schema/notification.schema';

import { EMIT_NOTI_QUEUE, NOTIFICATION_QUEUE } from 'src/constant';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
@Processor(NOTIFICATION_QUEUE)
export class NotificationConsumer {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    private prisma: PrismaService,
    @InjectQueue(EMIT_NOTI_QUEUE) private emitNotiQueue: Queue,
  ) {}
  @Process()
  async transcode(job: Job<any>) {
    const { userId: senderId, title, nameSender, id: linkId } = job?.data;

    const users = await this.prisma.user.findMany({
      where: {
        NOT: {
          id: senderId,
        },
      },
      select: { email: true },
    });

    const documentNotification = users.map((user) => ({
      linkId,
      receiverEmail: user.email,
      senderId: senderId,
      title: title,
      nameSender,
    }));

    try {
      await this.notificationModel.insertMany(documentNotification);
      users.forEach((user) => this.emitNotiQueue.add(user));
    } catch (error) {
      console.log(error);
    }
  }
}
