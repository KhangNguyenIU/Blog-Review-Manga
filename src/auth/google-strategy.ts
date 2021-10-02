import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import * as config from 'config';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || config.get('google').clientId,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || config.get('google').clientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log({ profile });
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
