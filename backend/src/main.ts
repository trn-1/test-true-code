import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  const whitelist = ['http://localhost:3000' as string];

  app.enableCors({
    origin: whitelist,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
  });

  app.setGlobalPrefix('api');

  await app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
  });
}
bootstrap();
