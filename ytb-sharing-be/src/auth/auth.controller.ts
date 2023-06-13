import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SiginDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SiginDto) {
    return this.authService.signin(dto);
  }
}
