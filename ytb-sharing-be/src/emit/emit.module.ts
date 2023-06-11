import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'schema/notification.schema';
import { EmitConsumer } from './emit.service';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    SocketModule,
  ],
  providers: [EmitConsumer],
})
export class EmitModule {}
