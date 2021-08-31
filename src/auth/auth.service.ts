import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/auth/dto/login.dto';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ){};

  async signup(createUserDto: CreateUserDto): Promise<string> {
    return this.userRepository.signup(createUserDto);
  }

  async signin(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const username = await this.validateUser(loginDto);
    if (!username) {
      throw new UnauthorizedException('Invalid Credential');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ username });
    if (user && (await user.validateUserPassword(password))) {
      return user.username;
    }

    return null;
  }
}
