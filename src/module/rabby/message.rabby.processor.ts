import { Injectable } from '@nestjs/common';
import { ConsumerService } from './consume.rabby.service';
import { ProducerService } from './producer.rabby.service';
import { MongoService } from "../mongo/mongo.service";
import { PersonData, Person } from "../mongo/DTO/any-data.schema";
// import { ConfigService } from '@nestjs/config';
// import { PersonService } from '../person/person.service';
// import type { IPersonRet, IReTaskMessage } from '../person/interfaces/IPerson';

@Injectable()
export class MessageProcessor {
	constructor(
		private readonly consumerRMQService: ConsumerService,
		private readonly producerRMQService: ProducerService,
		private readonly mongoService: MongoService<PersonData>,

		// private readonly configService: ConfigService,
		// private readonly personService: PersonService,
	) {}
	// Отслеживает очередь vi_queue
	startProcessing() {
		this.consumerRMQService.consumeMessages(
			async (message: string) => {
				const msgObj: Person[] = JSON.parse(message).data;
				if (msgObj.length) {
					for (const msg of msgObj) {
						const PersonData: Partial<PersonData> = {
							name: `${msg.firstName} ${msg.fatherName} ${msg.lastName} ${msg.pasportNum}`,
							description: `login: ${msg.login}, password:${msg.password}`,
							data: { person: msg, metadata:  Date.now() }
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
	//  В сообщении ищет personId и запрашивает у Postgresql персону
	//  если персона не найдена - null
	// private async handleMessage(message: string): Promise<IPersonRet | null> {
	// 	const { personId } = JSON.parse(message);
	// 	try {
	// 		console.log('Processing message:', message);
	// 		const person = await this.personService.findById(Number(personId));
	// 		if (person) {
	// 			console.log(
	// 				`Consummer: ${person.last_name} ${person.first_name}`,
	// 			);
	// 			return {
	// 				id: person.id,
	// 				last_name: person.last_name,
	// 				first_name: person.first_name,
	// 				name_lat: person.name_lat,
	// 				name_rus: person.name_rus,
	// 				status_id: person.status_id,
	// 			};
	// 		}
	// 		return null;
	// 	} catch (err) {
	// 		console.error('Error processing message:', err.message);
	// 		return null;
	// 	}
	// }
	// Для найденной персоны формируется msg и отправляется в очередь vi_backchange - очередь обработанных событий
	// private async backSender(msg: string) {
		// const newQueue = this.configService.get<string>('RABBIT_QUEUE2') || ''
		// const msg: IReTaskMessage = {
		// 	id: person.id,
		// 	type: 'person',
		// 	payload: person,
		// };
		// await this.producerRMQService.sendToQueue(msg);
		//return { success: true, message: 'Message sent to vi_backchange' };
	// }
}
