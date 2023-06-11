import { Logger } from '@nestjs/common';

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SocketGateway.name);
  constructor(private prisma: PrismaService) {}
  @WebSocketServer() server: Server;

  afterInit() {
    this.logger.log('Initialize WebSocket');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket) {
    const email = client.handshake.query['email'] as string;
    if (!email) {
      client.disconnect(true);
      return;
    }
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!user) {
        client.disconnect(true);
      }

      client.join(email);
    } catch (error) {
      client.disconnect(true);
    }
  }
}
