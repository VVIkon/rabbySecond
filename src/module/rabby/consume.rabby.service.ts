import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ConfigService } from '@nestjs/config';
// import { ITaskMessage } from '../person/interfaces/IPerson';

@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
	private connection: amqp.Connection;
	private channel: amqp.Channel;

	constructor(
		private readonly configService: ConfigService
	) {}

	async onModuleInit() {
		await this.connect();
	}

	async onModuleDestroy() {
		await this.closeConnect();
	}

	// очередь существует или создаём
	private async setupQueues(): Promise<void> {
		const q1 = this.configService.get<string>('RABBIT_QUEUE1') || '';
		const q2 = this.configService.get<string>('RABBIT_QUEUE2') || '';

		await this.channel.assertQueue(q1, { durable: true });
		await this.channel.bindQueue(q1, 'vi_exchange', q1);
		await this.channel.assertQueue(q2, { durable: true });
		await this.channel.bindQueue(q2, 'vi_exchange', q2);
	}

	private async connect() {
		try {
			const rubbitUrl = this.configService.get<string>('RABBIT_URL');
			this.connection = await amqp.connect(rubbitUrl);
			this.connection.on('close', async () => {
				console.log('RabbitMQ переподключаюсь');
				await new Promise((resolve) => setTimeout(resolve, 5000));
				await this.connect();
			});

			this.channel = await this.connection.createChannel();
			await this.setupQueues();

			console.log('Консьюмер подключено к RabbitMQ');
		} catch (error) {
			console.error('Error. Connection:', error);
			await new Promise((resolve) => setTimeout(resolve, 5000));
			await this.connect();
		}
	}

	consumeMessages(callback: (message: string) => void) {
		const q1 = this.configService.get<string>('RABBIT_QUEUE1') || '';
		if (!this.channel) {
			throw new Error('Error. RabbitMQ channel is not initialized');
		}

		// Начинаем прослушивать очередь
		this.channel.consume(
			q1,
			(msg) => {
				if (msg !== null) {
					const message: string = msg?.content?.toString() || '';
					callback(message);
					this.channel.ack(msg);
					console.log(`Кансьюммер забрал из ${q1} сообщение: ${message}`);
				}
			},
			{ noAck: false }, // Требуем подтверждение обработки
		);
	}

	private async closeConnect() {
		try {
			await this.channel?.close();
			await this.connection?.close();
			console.log('RabbitMQ connection closed');
		} catch (error) {
			console.error('Error closing RabbitMQ connection:', error);
		}
	}
}
