import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetVideoQuery {
  @Type(() => Number)
  @IsNumber()
  limit = 5;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  cursor = undefined;
}
