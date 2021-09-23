import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import {
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: config.get('jwtSecret'),
      jwtFromRequest: (req) => {
        if (!req || !req.cookies) return null;
        return req.cookies['token'];
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);
    const { email } = payload;
    const user = await this.userRepository.findOne({ email });
    const { password, ...result } = user;
    if (!user) {
      throw new NotFoundException('cannot find user');
    }
    return result;
  }
}
