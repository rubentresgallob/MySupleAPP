import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar archivos estáticos
  const publicPath = join(__dirname, '..', 'public');
  logger.log(`Public path: ${publicPath}`);
  
  app.useStaticAssets(publicPath);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger configuration
  const swaggerPath = 'api';
  const config = new DocumentBuilder()
    .setTitle('Supplement Tracking API')
    .setDescription('API completa para gestión de suplementos y seguimiento de tomas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Supplement API Documentation',
  });

  const port = process.env.PORT ?? 3000;
  
  await app.listen(port, '0.0.0.0');
  
  logger.log(`Application running on: http://localhost:3000`);
  logger.log(`Swagger docs at: http://localhost:3000/${swaggerPath}`);
}
bootstrap();