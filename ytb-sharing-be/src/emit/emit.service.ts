import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, Queue } from 'bull';
import { Model } from 'mongoose';
import { Notification } from 'schema/notification.schema';

import { EMIT_NOTI_QUEUE, EVENT_NOTI_SOCKET } from 'src/constant';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
@Processor(EMIT_NOTI_QUEUE)
export class EmitConsumer {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    private socketGateway: SocketGateway,
  ) {}
  @Process()
  async transcode(job: Job<{ email: string }>) {
    const data = job.data;
    const numberNotiUnread = await this.notificationModel
      .count({ receiverEmail: data.email, isReaded: false })
      .exec();
    console.log(data);
    this.socketGateway.server
      .to(data.email)
      .emit(EVENT_NOTI_SOCKET, numberNotiUnread);

    try {
    } catch (error) {
      console.log(error);
    }
  }
}
