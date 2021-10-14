import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { urlencoded, json } from 'express';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const whitelist = ['https://www.myblog.engineer', 'http://localhost:3000'];
  app.enableCors({
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const port: number = parseInt(`${process.env.PORT}`) || 8000;

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });

  await app.listen(port, () => {
    console.log('Server is running on port:  ', port);
  });
}
bootstrap();
