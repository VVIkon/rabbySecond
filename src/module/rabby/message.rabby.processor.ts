import { Injectable } from '@nestjs/common';
import { ConsumerService } from './consume.rabby.service';
import { ProducerService } from './producer.rabby.service';
import { MongoService } from "../mongo/mongo.service";
import { PersonData } from "../mongo/DTO/any-data.schema";
// import { ConfigService } from '@nestjs/config';
// import { PersonService } from '../person/person.service';
// import type { IPersonRet, IReTaskMessage } from '../person/interfaces/IPerson';

@Injectable()
export class MessageProcessor {
	constructor(
		private readonly consumerRMQService: ConsumerService,
		private readonly producerRMQService: ProducerService,
		private readonly mongoService: MongoService<PersonData>,
	) {}
	// Отслеживает очередь vi_queue
	startProcessing() {
		this.consumerRMQService.consumeMessages(
			async (message: string) => {
				const msgObj = JSON.parse(message).data;
				if (msgObj.length) {
					for (const msg of msgObj) {
						const PersonData: Partial<PersonData> = {
							...msg
						}
						const retVal = await this.mongoService.create(PersonData);
						if(retVal.id) {
							const dataMwssage = {
								pattern: JSON.parse(message).pattern,
								data: msg
							}
							await this.producerRMQService.sendToQueue(message);
						}

					}
				}
			},
		);
	}

}
