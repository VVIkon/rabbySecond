import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class PersonData extends Document {
	@ApiProperty()
	@Prop()
	lastName: string;

	@ApiProperty()
	@Prop()
	firstName: string;

	@ApiProperty()
	@Prop()
	fatherName: string;

	@ApiProperty()
	@Prop()
	dateOfBirth: string;

	@ApiProperty()
	@Prop()
	yearsOld: number;

	@ApiProperty()
	@Prop()
	phone: string;

	@ApiProperty()
	@Prop()
	login: string;

	@ApiProperty()
	@Prop()
	password: string;

	@ApiProperty()
	@Prop()
	email: string;

	@ApiProperty()
	@Prop()
	gender: string;

	@ApiProperty()
	@Prop()
	genderCode: string;

	@ApiProperty()
	@Prop()
	pasportNum: string;

	@ApiProperty()
	@Prop()
	pasportSerial: string;

	@ApiProperty()
	@Prop()
	pasportNumber: number;

	@ApiProperty()
	@Prop()
	pasportCode: string;

	@ApiProperty()
	@Prop()
	pasportOtd: string;

	@ApiProperty()
	@Prop()
	pasportDate: string;

	@ApiProperty()
	@Prop()
	inn_fiz: string;

	@ApiProperty()
	@Prop()
	inn_ur: string;

	@ApiProperty()
	@Prop()
	snils: string;

	@ApiProperty()
	@Prop()
	oms: number;

	@ApiProperty()
	@Prop()
	ogrn: string;

	@ApiProperty()
	@Prop()
	kpp: number;

	@ApiProperty()
	@Prop()
	address: string;

	@ApiProperty()
	@Prop()
	addressReg: string;

	@ApiProperty()
	@Prop()
	country: string;

	@ApiProperty()
	@Prop()
	region: string;

	@ApiProperty()
	@Prop()
	city: string;

	@ApiProperty()
	@Prop()
	street: string;

	@ApiProperty()
	@Prop()
	house: number;

	@ApiProperty()
	@Prop()
	apartment: number;

	@ApiProperty()
	@Prop()
	bankBIK: number;

	@ApiProperty()
	@Prop()
	bankCorr: string;

	@ApiProperty()
	@Prop()
	bankINN: number;

	@ApiProperty()
	@Prop()
	bankKPP: number;

	@ApiProperty()
	@Prop()
	bankNum: string;

	@ApiProperty()
	@Prop()
	bankClient: string;

	@ApiProperty()
	@Prop()
	bankCard: string;

	@ApiProperty()
	@Prop()
	bankDate: string;

	@ApiProperty()
	@Prop()
	bankCVC: number;

	@ApiProperty()
	@Prop()
	eduSpecialty: string;

	@ApiProperty()
	@Prop()
	eduProgram: string;

	@ApiProperty()
	@Prop()
	eduName: string;

	@ApiProperty()
	@Prop()
	eduDocNum: string;

	@ApiProperty()
	@Prop()
	eduRegNumber: string;

	@ApiProperty()
	@Prop()
	eduYear: number;

	@ApiProperty()
	@Prop()
	carBrand: string;

	@ApiProperty()
	@Prop()
	carModel: string;

	@ApiProperty()
	@Prop()
	carYear: number;

	@ApiProperty()
	@Prop()
	carColor: string;

	@ApiProperty()
	@Prop()
	carNumber: string;

	@ApiProperty()
	@Prop()
	carVIN: string;

	@ApiProperty()
	@Prop()
	carSTS: string;

	@ApiProperty()
	@Prop()
	carSTSDate: string;

	@ApiProperty()
	@Prop()
	carPTS: string;

	@ApiProperty()
	@Prop()
	carPTSDate: string;
}

export const PersonDataSchema = SchemaFactory.createForClass(PersonData);
