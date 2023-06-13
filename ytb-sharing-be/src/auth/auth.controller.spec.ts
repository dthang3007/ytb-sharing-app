import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SiginDto, SignupDto } from './dto/auth.dto';
import { User } from '@prisma/client';

describe('AuthController', () => {
  let controller: AuthController;

  const userData: User = {
    id: 1,
    email: 'hello@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'thangpham',
    hash: 'thangawer',
  };

  const responseSigninMock = { access_token: 'string', email: 'string' };
  const mockAuthService = {
    signup: jest.fn(() => {
      return Promise.resolve(userData);
    }),
    signin: jest.fn(() => {
      return Promise.resolve(responseSigninMock);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        ConfigService,
        JwtService,
        PrismaService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should call authService.signup with the provided dto', async () => {
    const signupDto: SignupDto = {
      name: 'Thang Pham',
      email: 'thangpham@gmail.com',
      password: '1234a@Aasd',
    };
    await expect(controller.signup(signupDto)).resolves.toBe(userData);
    expect(mockAuthService.signup).toHaveBeenCalledWith(signupDto);
  });

  it('should call authService.signin with the provided dto', async () => {
    const signinDto: SiginDto = {
      email: 'thangpham@gmail.com',
      password: '1234a@Aasd',
    };
    await expect(controller.signin(signinDto)).resolves.toBe(
      responseSigninMock,
    );
    expect(mockAuthService.signin).toHaveBeenCalledWith(signinDto);
  });
});
