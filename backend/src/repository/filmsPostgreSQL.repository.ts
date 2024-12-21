import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilmEntity } from '../films/entities/film.entity';

@Injectable()
export class FilmsPostgreSQLRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
  ) {}

  async findAllFilms(): Promise<{ total: number; items: FilmEntity[] }> {
    const [total, items] = await Promise.all([
      this.filmRepository.count(),
      this.filmRepository.find({ relations: { schedule: true } }),
    ]);
    return { total, items };
  }

  async findFilmById(id: string): Promise<FilmEntity> {
    try {
      return this.filmRepository.findOne({
        where: { id },
        relations: { schedule: true },
      });
    } catch (error) {
      throw new NotFoundException(`Фильм с таким Id ${id} не найден`);
    }
  }

  async findScheduleIndexInFilm(filmId: string, session: string) {
    const film = await this.findFilmById(filmId);
    const scheduleIndex = film.schedule.findIndex((s) => s.id === session);
    if (scheduleIndex === -1) {
      throw new NotFoundException(
        `Такого расписания нет для фильма '${film.title}'`,
      );
    }
    return scheduleIndex;
  }

  async createNewFilm(film: FilmEntity): Promise<FilmEntity> {
    const films = await this.filmRepository.find({
      relations: { schedule: true },
    });
    if (films.find((f) => f.title === film.title)) {
      throw new BadRequestException(
        `Фильм с таким названием  '${film.title}' уже существует`,
      );
    }
    const savedFilm = await this.filmRepository.save(film);
    return savedFilm;
  }
}
