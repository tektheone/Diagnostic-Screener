import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

export async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT ?? 5000);
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
}

if (require.main === module) {
  bootstrap();
}
