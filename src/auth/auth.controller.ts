import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleTokenDto } from './dto/google-token.dto';
import { LoginDto } from './dto/login.dto';
import { GetUser } from './get-user.decorator';
import { Response, Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/google-login')
  googleAuth(
    @Body() googleDto: GoogleTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.googleAuth(googleDto, res);
  }

  @Get('/signout')
  signout(@Res() res: Response) {
    res.clearCookie('token');
    return res.send('clear');
  }

  @Post('/signup')
  signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<string> {
    return this.authService.signup(createUserDto);
  }

  @Post('/signin')
  signin(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(loginDto, res);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  getUser(@GetUser() user : User){
    // console.log("user", user)
    // return res.send(user)
    return user
  }

  @Get('/test')
  @UseGuards(AuthGuard('jwt'))
  tes(@GetUser() user: User, @Res() res: Response) {
    return res.send("hello")
  }
}
