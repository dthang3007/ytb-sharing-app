import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient, User } from '@prisma/client';
import * as argon from 'argon2';
import { describe } from 'node:test';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { SiginDto, SignupDto } from './dto/auth.dto';
import { JwtStrategy } from './strategy/jwt.strategy';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
export const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<{
  // this is needed to resolve the issue with circular types definition
  // https://github.com/prisma/prisma/issues/10203
  [K in keyof PrismaClient]: Omit<PrismaClient[K], 'groupBy'>;
}>;
describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: DeepMockProxy<PrismaClient>;
  let userData: User;
  let password: string;

  beforeEach(async () => {
    password = '123456a@A';
    const hashedPassword = await argon.hash(password);
    userData = {
      id: 1,
      email: 'hello@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'thangpham',
      hash: hashedPassword,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtStrategy, ConfigService, PrismaService],
      imports: [JwtModule.register({})],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();
    prismaService = module.get(PrismaService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    const dto = {
      email: 'hello1123@gmail.com',
      password: 'hello@123',
      name: 'thangpham',
    };

    describe(' if user does not exist', () => {
      it('should create a new user', async () => {
        prismaService.user.findFirst.mockResolvedValue(null);
        prismaService.user.create.mockResolvedValue(userData);
        const result = await authService.signup(dto);

        expect(result).toBe(userData);
      });
    });

    describe('if user existed', () => {
      it('should throw error', async () => {
        prismaService.user.findFirst.mockResolvedValue(userData);
        expect(async () => {
          await authService.signup(dto);
        }).rejects.toThrow('email existed');
      });
    });
  });

  describe('signin', () => {
    const dto: SiginDto = {
      email: 'test1@gmail.com',
      password: '123456a@A',
    };

    describe('if wrong pass', async () => {
      const password = '123456a@A';
      const hashedPassword = await argon.hash(password);
      const mockUser = {
        id: 1,
        email: 'hello@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'thangpham',
        hash: hashedPassword,
      };
      it('should throw error credentials incorrect', async () => {
        expect(async () => {
          await authService.signin({
            email: mockUser.email,
            password: 'hellopasswordtemp',
          });
        }).rejects.toThrow('credentials incorrect');
      });
    });
  });
  //   it('should throw ForbiddenException when email already exists', async () => {
  //   //   // Arrange
  //   //   const signupDto = {
  //   //     name: 'John Doe',
  //   //     email: 'johndoe@example.com',
  //   //     password: 'password123',
  //   //   };

  //   //   jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue({});

  //   //   // Act & Assert
  //   //   await expect(service.signup(signupDto)).rejects.toThrowError(ForbiddenException);
  //   //   expect(prismaService.user.findFirst).toHaveBeenCalledWith({
  //   //     where: { email: signupDto.email },
  //   //   });
  //   // });
  // });
});
