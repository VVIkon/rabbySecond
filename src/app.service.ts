import { Injectable } from '@nestjs/common';
import { MessageProcessor } from './module/rabby/message.rabby.processor';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
	constructor(
		private readonly configService: ConfigService,
		private readonly messageProcessor: MessageProcessor,
	) {}

	onApplicationBootstrap() {
		this.messageProcessor.startProcessing();
	}
}
