import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { urlencoded, json } from 'express';
import * as cookieParser from 'cookie-parser';
import * as config from 'config';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       console.log('allowed cors for:', origin);
  //       callback(null, true);
  //     } else {
  //       console.log('blocked cors for:', origin);
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   allowedHeaders:
  //     'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  //   methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  //   credentials: true,
  // });
  app.enableCors()
  app.use(cookieParser());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const port: number = parseInt(`${process.env.PORT}`) || 8000;

  await app.listen(port, () => {
    console.log('Server is running on port:  ', port);
  });
}
bootstrap();
