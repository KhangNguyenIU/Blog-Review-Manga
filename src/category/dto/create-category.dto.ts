import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(200)
  @IsOptional()
  description: string;
}
