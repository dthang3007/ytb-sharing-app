import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoService } from './video.service';
import { GetVideoQuery } from './dto/get-video-query.dto';
import { User } from '@prisma/client';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  get(@Query() query: GetVideoQuery) {
    return this.videoService.getCursor(query);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser() user: User, @Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(user, createVideoDto);
  }
}
