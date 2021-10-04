import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import {
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as config from 'config';
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: (req) => {
        if (!req || !req.cookies) return null;
        console.log("cookie", req.cookies["token"])
        return req.cookies["token"];
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || config.get('jwt').secret,
    });
  }

  async validate(payload: JwtPayload) {
    console.log({payload});
    const { email } = payload;
    const user = await this.userRepository.findOne({ email });
    const { password, ...result } = user;
    if (!user) {
      throw new NotFoundException('cannot find user');
    }
    return result;
  }
}
