import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { PORT } from './common/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT ?? 3000);
}
bootstrap();
