import { Injectable, Inject } from '@nestjs/common';

import { FilmsMongoDBRepository } from '../repository/filmsMongoDB.repository';
import { FilmsPostgreSQLRepository } from '../repository/filmsPostgreSQL.repository';
import { CreateFilmDTO } from './dto/films.dto';
import { FilmEntity } from './entities/film.entity';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository:
      | FilmsMongoDBRepository
      | FilmsPostgreSQLRepository,
  ) {}

  async getAllFilms() {
    return this.filmsRepository.findAllFilms();
  }

  async getScheduleFilm(id: string) {
    const film = await this.filmsRepository.findFilmById(id);
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }

  async getNewFilm(data: CreateFilmDTO | FilmEntity) {
    if (this.filmsRepository instanceof FilmsMongoDBRepository) {
      const filmData: CreateFilmDTO = data as CreateFilmDTO;
      return await this.filmsRepository.createNewFilm(filmData);
    } else {
      const filmData: FilmEntity = data as FilmEntity;
      return await this.filmsRepository.createNewFilm(filmData);
    }
  }
}
