import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { MSG_PASSWORD, RGX_PASSWORD } from 'src/constant';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(RGX_PASSWORD, {
    message: MSG_PASSWORD,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class SiginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
