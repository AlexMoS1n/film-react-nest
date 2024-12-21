import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNumber, IsString, IsArray } from 'class-validator';
import { ScheduleEntity } from './schedule.entity';

@Entity('films')
export class FilmEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNumber()
  rating: number;

  @Column()
  @IsString()
  director: string;

  @Column('text', { array: true })
  @IsArray()
  tags: string[];

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  about: string;

  @Column()
  @IsString()
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film, {
    cascade: true,
  })
  schedule: ScheduleEntity[];
}
