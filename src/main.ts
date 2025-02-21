import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './domains/app.module';
import { PORT } from './common/env';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(PORT ?? 3000);
}
bootstrap();
