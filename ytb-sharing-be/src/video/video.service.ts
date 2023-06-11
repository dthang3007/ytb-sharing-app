import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { NOTIFICATION_QUEUE } from 'src/constant';
import { GetVideoQuery } from './dto/get-video-query.dto';
import { User } from '@prisma/client';

@Injectable()
export class VideoService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue(NOTIFICATION_QUEUE) private notificationQueue: Queue,
  ) {}

  async create(user: User, dto: CreateVideoDto) {
    const { id, name } = user;
    try {
      const data = await this.prisma.video.create({
        data: {
          ...dto,
          userId: id,
        },
      });
      await this.notificationQueue.add(
        {
          ...data,
          nameSender: name,
        },
        { removeOnComplete: true },
      );
    } catch (e) {
      throw e;
    }
  }

  async getCursor(query: GetVideoQuery) {
    const { limit, cursor } = query;
    const cursorObj = cursor ? { id: cursor } : undefined;

    try {
      const videos = await this.prisma.video.findMany({
        take: limit,
        skip: cursor ? 1 : 0,
        cursor: cursorObj,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });

      return videos;
    } catch (error) {
      throw error;
    }
  }
}
