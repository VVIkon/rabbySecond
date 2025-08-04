import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ConfigService } from '@nestjs/config';
// import { IReTaskMessage } from '../person/interfaces/IPerson';

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
	private connection: amqp.Connection;
	private channel: amqp.Channel;
	private channelWrapper: amqp.ChannelWrapper;

	constructor(private readonly configService: ConfigService) {}

	async onModuleDestroy() {
		await this.close();
	}

	async onModuleInit() {
		await this.connect();
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

			console.log('Продюсер подключен к RabbitMQ');
		} catch (error) {
			console.error('Ошибка подключения:', error);
			await new Promise((resolve) => setTimeout(resolve, 5000));
			await this.connect();
		}
	}

	private async close() {
		if (this.channel) await this.channel.close();
		if (this.connection) await this.connection.close();
		console.log('Соединение с RabbitMQ закрыто');
	}

	// Отправляем сообщение в очередь
	async sendToQueue(message: string) {
		const q2 = this.configService.get<string>('RABBIT_QUEUE2') || '';
    	this.channel.sendToQueue(q2, Buffer.from(message), { persistent: true });
    	console.log(`Сообщение отправлено в ${q2}: "${message}"`);

		// Закрываем соединение
		// setTimeout(() => {
		// 	this.connection.close();
		// }, 500);
	}

	async publishToExchange(
		exchangeName: string,
		queue: string,
		routingKey: string,
		message: any, //IReTaskMessage,
	) {
		try {
			await this.channel.assertExchange(exchangeName, 'direct', {
				durable: true,
			});
			await this.channel.assertQueue(queue, { durable: true });
			await this.channel.prefetch(1);

			const msg = JSON.stringify(message);
			this.channel.publish(exchangeName, routingKey, Buffer.from(msg), {
				persistent: true,
			});
			console.log(`Сообщение отправлено в ${exchangeName}: "${msg}"`);
		} catch (err) {
			console.error('Ошибка отправки:', err.message);
		}
	}
}
