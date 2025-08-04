import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PersonData, PersonDataSchema } from './DTO/any-data.schema';
import { MongoService } from './mongo.service';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				const uri = configService.get<string>('MONGO_URL') || '';
				const connection = mongoose.createConnection(uri);
				connection.on('connected', () => {
					console.log(`Connection to MongoDB: ${connection.name}`);
				});
				connection.on('error', (err) => {
					console.error('Connection error to MongoDB', err);
				});
				return {
					uri,
					connectionFactory: () => connection,
				};
			},
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([
			{ name: PersonData.name, schema: PersonDataSchema },
		]),
	],
	providers: [MongoService],
	exports: [MongoService],
})
export class MongoModule {}
