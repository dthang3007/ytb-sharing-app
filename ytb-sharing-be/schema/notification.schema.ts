import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
  timestamps: true,
})
export class Notification {
  @Prop()
  linkId: number;

  @Prop()
  receiverEmail: string;

  @Prop()
  senderId: number;

  @Prop()
  title: string;

  @Prop()
  nameSender: string;

  @Prop({ default: false })
  isReaded: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
