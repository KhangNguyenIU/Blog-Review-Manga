import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { JwtStrategy } from './jwt-Strategy';
import { GoogleStrategy } from './google-strategy';
import * as config from 'config';

const dbConfig = config.get('jwt');

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET || dbConfig.get('secret'),
          signOptions: {
            expiresIn: 86400,
          },
        };
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
