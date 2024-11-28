import { Injectable } from '@nestjs/common';

import { FilmsRepository } from '../repository/films.repository';
import { CreateFilmDTO } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    return this.filmsRepository.findAllFilms();
  }

  async findById(id: string) {
    return this.filmsRepository.findFilmById(id);
  }

  async create(data: CreateFilmDTO) {
    return this.filmsRepository.createNewFilm(data);
  }
}
