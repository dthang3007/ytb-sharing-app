import { ForbiddenException, Injectable } from '@nestjs/common';
import { SiginDto, SignupDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup({ name, email, password }: SignupDto) {
    try {
      const emailDb = await this.prisma.user.findFirst({ where: { email } });

      if (emailDb) {
        throw new ForbiddenException('email existed');
      }

      const hash = await argon.hash(password);
      return await this.prisma.user.create({
        data: {
          name,
          email,
          hash,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async signin({ email, password }: SiginDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new ForbiddenException('credentials incorrect');
      }

      const pwMatches = await argon.verify(user.hash, password);

      if (!pwMatches) throw new ForbiddenException('credentials incorrect');

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw error;
    }
  }

  async signToken(userId: number, email: string) {
    const payload = { userId, email };
    const secretKey = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, { secret: secretKey });
    return { access_token: token, email };
  }
}
