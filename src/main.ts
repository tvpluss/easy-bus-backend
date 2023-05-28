import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.PORT);

  const config = new DocumentBuilder()
    .setTitle('Bookera Backend')
    .setDescription(
      'APIs documentation for backend of bookera, a social book-reading platform',
    )
    .setVersion('1.0')
    .addTag('bookera')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
