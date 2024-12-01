import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Schedule {
  @Prop({ required: true })
  id: string;

  @Prop()
  daytime: string;

  @Prop()
  hall: number;

  @Prop()
  rows: number;

  @Prop()
  seats: number;

  @Prop()
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

export type FilmDocument = HydratedDocument<Film>;

@Schema()
export class Film {
  @Prop({ required: true })
  id: string;

  @Prop()
  rating: number;

  @Prop()
  director: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop({ type: [ScheduleSchema] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
