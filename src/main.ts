import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './domains/app.module';
import { NODE_ENV, PORT } from './common/env';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (NODE_ENV !== 'prod') setupSwagger(app);

  await app.listen(PORT ?? 3000);
}
bootstrap();
