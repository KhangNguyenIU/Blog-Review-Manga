import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { urlencoded, json } from 'express';
import * as cookieParser from 'cookie-parser';
import * as config from "config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  // const configServer = app.get(ConfigService);
  const port: number = parseInt(`${process.env.PORT}`) || 8000;
  await app.listen(port, () => {
    console.log('Server is running on port: ', port);

    // console.log("proces", process.env.PORT)
    // console.log('config', config.get("server").port)
  });
}
bootstrap();
