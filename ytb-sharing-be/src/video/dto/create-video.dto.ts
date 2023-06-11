import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { RGX_LINK_VIDEO_YTB } from 'src/constant';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  @Matches(RGX_LINK_VIDEO_YTB, { message: 'Invalid Link' })
  link: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
