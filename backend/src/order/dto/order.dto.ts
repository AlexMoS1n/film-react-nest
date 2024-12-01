import {
  IsString,
  IsNumber,
  IsEmail,
  IsMobilePhone,
  IsArray,
} from 'class-validator';

export class GetTicketDTO {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsString()
  day: string;
  @IsString()
  time: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class GetOrderDTO {
  @IsArray()
  tickets: GetTicketDTO[];
  @IsEmail()
  email: string;
  @IsMobilePhone('ru-RU')
  phone: string;
}
