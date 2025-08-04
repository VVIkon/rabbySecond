import { ApiProperty } from '@nestjs/swagger';

export class PersonDTO {
	@ApiProperty()
	lastName: string;

	@ApiProperty()
	firstName: string;

	@ApiProperty()
	fatherName: string;

	@ApiProperty()
	dateOfBirth: string;

	@ApiProperty()
	yearsOld: number;

	@ApiProperty()
	phone: string;

	@ApiProperty()
	login: string;

	@ApiProperty()
	password: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	gender: string;

	@ApiProperty()
	genderCode: string;

	@ApiProperty()
	pasportNum: string;

	@ApiProperty()
	pasportSerial: string;

	@ApiProperty()
	pasportNumber: number;

	@ApiProperty()
	pasportCode: string;

	@ApiProperty()
	pasportOtd: string;

	@ApiProperty()
	pasportDate: string;

	@ApiProperty()
	inn_fiz: string;

	@ApiProperty()
	inn_ur: string;

	@ApiProperty()
	snils: string;

	@ApiProperty()
	oms: number;

	@ApiProperty()
	ogrn: string;

	@ApiProperty()
	kpp: number;

	@ApiProperty()
	address: string;

	@ApiProperty()
	addressReg: string;

	@ApiProperty()
	country: string;

	@ApiProperty()
	region: string;

	@ApiProperty()
	city: string;

	@ApiProperty()
	street: string;

	@ApiProperty()
	house: number;

	@ApiProperty()
	apartment: number;

	@ApiProperty()
	bankBIK: number;

	@ApiProperty()
	bankCorr: string;

	@ApiProperty()
	bankINN: number;

	@ApiProperty()
	bankKPP: number;

	@ApiProperty()
	bankNum: string;

	@ApiProperty()
	bankClient: string;

	@ApiProperty()
	bankCard: string;

	@ApiProperty()
	bankDate: string;

	@ApiProperty()
	bankCVC: number;

	@ApiProperty()
	eduSpecialty: string;

	@ApiProperty()
	eduProgram: string;

	@ApiProperty()
	eduName: string;

	@ApiProperty()
	eduDocNum: string;

	@ApiProperty()
	eduRegNumber: string;

	@ApiProperty()
	eduYear: number;

	@ApiProperty()
	carBrand: string;

	@ApiProperty()
	carModel: string;

	@ApiProperty()
	carYear: number;

	@ApiProperty()
	carColor: string;

	@ApiProperty()
	carNumber: string;

	@ApiProperty()
	carVIN: string;

	@ApiProperty()
	carSTS: string;

	@ApiProperty()
	carSTSDate: string;

	@ApiProperty()
	carPTS: string;

	@ApiProperty()
	carPTSDate: string;
}
