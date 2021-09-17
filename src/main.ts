import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { config } from 'rxjs';
import { urlencoded, json } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const configServer = app.get(ConfigService);

  await app.listen(configServer.get('port') || 8000, () => {
    console.log('Server is running on port: ', configServer.get('port'));
  });
}
bootstrap();
