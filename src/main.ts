import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function bootstrap(): Promise<NestExpressApplication> {
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
		{ cors: true },
	);
	const configService = app.get(ConfigService);
	const reflector = app.get(Reflector); //  прикрепляет пользовательские метаданные к обработчикам маршрутов через декораторы
	// Настройка Swagger
	const configSwager = new DocumentBuilder()
		.setTitle('VI Nest')
		.setDescription('Документация API')
		.setVersion('1.0')
		.addTag('persons')
		// .addBearerAuth() // Для JWT-аутентификации
		.build();

	const document = SwaggerModule.createDocument(app, configSwager);
	SwaggerModule.setup('api/docs', app, document); // Доступ по /api/docs

	const port = configService.get<number>('SERVER_PORT') || 3001;
	await app.listen(port);
	console.info(`server running on ${await app.getUrl()}`);
	return app;
}
export const nodeApp = bootstrap();
