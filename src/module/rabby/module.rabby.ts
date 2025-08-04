import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { ConsumerService } from "./consume.rabby.service";
import { ProducerService } from "./producer.rabby.service";
import { MessageProcessor } from "./message.rabby.processor";

@Module({
	imports: [MongoModule],
	providers: [
		ConsumerService,
		ProducerService,
		MessageProcessor,
	],
	exports: [
		ConsumerService,
		ProducerService,
	],
})
export class RabbyModule {}
