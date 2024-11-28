import { IsString, IsNumber, IsFQDN, IsNotEmpty } from 'class-validator';

export class GetScheduleDTO {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class GetFilmDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: GetScheduleDTO[];
}

export class CreateFilmDTO {
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  tags: string[];
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  schedule: GetScheduleDTO[];
}
