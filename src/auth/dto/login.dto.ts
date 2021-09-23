import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(24)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(24)
  password: string;


}
