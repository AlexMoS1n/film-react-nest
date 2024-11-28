import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import {
  GetFilmDTO,
  GetScheduleDTO,
  CreateFilmDTO,
} from 'src/films/dto/films.dto';

import { Film } from 'src/films/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  private getFilmFromDataBaseFn(): (filmDataBase: GetFilmDTO) => GetFilmDTO {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        description: root.description,
        schedule: root.schedule,
      };
    };
  }

  async findAllFilms(): Promise<GetFilmDTO[]> {
    const films = await this.filmModel.find({});
    return films.map(this.getFilmFromDataBaseFn());
  }

  async findFilmById(id: string): Promise<GetScheduleDTO[]> {
    const film = await this.filmModel.findOne({ id });
    if (!film) {
      throw new NotFoundException(`Фильм с таким Id ${id} не найден`);
    }
    return film.schedule;
  }

  async createNewFilm(film: CreateFilmDTO): Promise<Film> {
    const films = await this.filmModel.find({});
    if (films.find((f) => f.title === film.title)) {
      throw new NotFoundException('Фильм с таким названием уже существует');
    }
    const newFilm = new this.filmModel({ ...film, id: uuidv4() });
    const createdFilm = await newFilm.save();
    return this.getFilmFromDataBaseFn()(createdFilm);
  }
}
