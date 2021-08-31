import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<string> {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  signin(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(loginDto);
  }
  @Post('/test')
  @UseGuards(AuthGuard())
  tes(@GetUser() user: User) {
    console.log(user);
  }
}
