"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('CirclechainBootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '10mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '10mb' }));
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    app.enableCors({
        origin: [
            clientUrl,
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:3001',
        ],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const port = process.env.PORT || 5000;
    await app.listen(port);
    logger.log(`🚀 Circlechain Backend running on http://localhost:${port}/api`);
    logger.log(`📧 Brevo Newsletter & Google SSO ready`);
}
bootstrap();
//# sourceMappingURL=main.js.map