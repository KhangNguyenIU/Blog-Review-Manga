import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(24)
  password: string;


}
