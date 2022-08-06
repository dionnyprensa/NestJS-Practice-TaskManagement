import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.setGlobalPrefix('/api')

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const port = 3000

  await app.listen(port);

  logger.log(`
    App started 🚀
    Listening on port ${port}
  `)
}
bootstrap();
