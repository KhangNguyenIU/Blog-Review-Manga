import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { config } from 'rxjs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServer = app.get(ConfigService);

  await app.listen(configServer.get('port') || 3000, () => {
    console.log('Server is running on port: ', configServer.get('port'));
  });
}
bootstrap();
