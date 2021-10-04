import {
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { LoginDto } from 'src/auth/dto/login.dto';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleTokenDto } from './dto/google-token.dto';
import { JwtPayload } from './jwt-payload.interface';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async googleAuth(googleDto: GoogleTokenDto, res: Response) {
    const { tokenId } = googleDto;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, email, picture, jti } = ticket.getPayload();

    if (email_verified) {
      const existedUser: User = await this.userRepository.findOne({ email });
      if (existedUser) {
        const payload: JwtPayload = { email };
        const accessToken = this.jwtService.sign(payload);
        res.cookie('token', accessToken, {
          expires: new Date(new Date().getTime() +1000000),
        });
        return { accessToken };
      }
      const createUserDto: CreateUserDto = {
        username: name,
        email: email,
        avatar: picture,
        password: jti,
        reenterpassword: jti,
      };
      const result = await this.userRepository.signup(createUserDto);
      const payload: JwtPayload = { email };
        const accessToken = this.jwtService.sign(payload);
        res.cookie('token', accessToken, {
          expires: new Date(new Date().getTime() +1000000),


        });
        return { accessToken };
    }
    throw new NotImplementedException();
  }

  async signup(createUserDto: CreateUserDto): Promise<string> {
    return this.userRepository.signup(createUserDto);
  }

  async signin(
    loginDto: LoginDto,
    res: Response,
  ): Promise<{ accessToken: string }> {
    const email = await this.validateUser(loginDto);
    if (!email) {
      throw new UnauthorizedException('Invalid Credential');
    }

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);
    res.cookie('token', accessToken, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 60*60*24),   
    });
    return { accessToken };
  }

  async validateUser(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ email });
    if (user && (await user.validateUserPassword(password))) {
      return user.email;
    }

    return null;
  }
}
