import { Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { NotificationService } from './notification.service';
import { GetUser } from 'src/auth/decorator/getUser.decorator';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtGuard)
  @Get()
  getNoti(@GetUser('email') email: string) {
    return this.notificationService.getNoti(email);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  markReaded(@Param('id') id: string) {
    return this.notificationService.markReaded(id);
  }
}
