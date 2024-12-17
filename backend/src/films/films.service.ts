import { Injectable } from '@nestjs/common';

import { FilmsRepository } from '../repository/filmsMongoDB.repository';
import { CreateFilmDTO } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilms() {
    return this.filmsRepository.findAllFilms();
  }

  async getScheduleFilm(id: string) {
    const film = (await this.filmsRepository.findFilmById(id)).toObject();
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }

  async getNewFilm(data: CreateFilmDTO) {
    return this.filmsRepository.createNewFilm(data);
  }
}
