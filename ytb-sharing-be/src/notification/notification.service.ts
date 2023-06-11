import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from 'schema/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  async getNoti(email: string) {
    try {
      const noti = await this.notificationModel
        .find({ receiverEmail: email })
        .sort({ createdAt: 'desc' })
        .exec();

      return noti;
    } catch (error) {
      throw error;
    }
  }

  async markReaded(id: string) {
    try {
      await this.notificationModel.updateOne(
        { _id: id },
        { $set: { isReaded: true } },
      );
    } catch (error) {
      throw error;
    }
  }
}
