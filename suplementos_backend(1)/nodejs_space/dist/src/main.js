"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const publicPath = (0, path_1.join)(__dirname, '..', 'public');
    logger.log(`Public path: ${publicPath}`);
    app.useStaticAssets(publicPath);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const swaggerPath = 'api';
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Supplement Tracking API')
        .setDescription('API completa para gestión de suplementos y seguimiento de tomas')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(swaggerPath, app, document, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Supplement API Documentation',
    });
    const port = process.env.PORT ?? 3000;
    await app.listen(port, '0.0.0.0');
    logger.log(`Application running on: http://localhost:3000`);
    logger.log(`Swagger docs at: http://localhost:3000/${swaggerPath}`);
}
bootstrap();
//# sourceMappingURL=main.js.map