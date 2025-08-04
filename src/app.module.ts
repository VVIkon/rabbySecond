import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbyModule } from './module/rabby/module.rabby';
import { MessageProcessor } from './module/rabby/message.rabby.processor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoModule } from './module/mongo/mongo.module';
import * as Joi from 'joi';

function validateConfig(config: Record<string, unknown>) {
	if (!config.SERVER_PORT || config.SERVER_PORT === 0) {
		throw new Error('Invalid Server Port in configuration');
	}
	if (!config.RABBIT_URL || !config.RABBIT_QUEUE1) {
		throw new Error('Invalid Rabbit in configuration');
	}

	return config;
}

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			// envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
			validate: validateConfig,
			validationSchema: Joi.object({
				MONGO_URI: Joi.string().required(),
				MONGO_CONNECTION_NAME: Joi.string().default('default'),
			}),
		}),
		RabbyModule,
		MongoModule,
	],
	providers: [ConfigService, AppService, MessageProcessor],
})
export class AppModule {}
