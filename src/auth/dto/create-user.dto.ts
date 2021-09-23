import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(24)
  password: string;


  @MinLength(6)
  @MaxLength(24)
  reenterpassword: string;
  
  @IsOptional()
  username: string;



  @IsOptional()
  avatar: string
}
