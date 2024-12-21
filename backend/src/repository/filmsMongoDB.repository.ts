import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { GetFilmDTO, CreateFilmDTO } from 'src/films/dto/films.dto';
import { Film, FilmDocument } from '../films/schemas/film.schema';

@Injectable()
export class FilmsMongoDBRepository {
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

  async findAllFilms(): Promise<{ total: number; items: GetFilmDTO[] }> {
    const films = await this.filmModel.find({}).lean();
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: films.map(this.getFilmFromDataBaseFn()),
    };
  }

  async findFilmById(id: string): Promise<FilmDocument> {
    try {
      const film = await this.filmModel.findOne({ id });
      return film;
    } catch {
      throw new NotFoundException(`Фильм с таким Id ${id} не найден`);
    }
  }

  async findScheduleIndexInFilm(filmId: string, session: string) {
    const film = (await this.findFilmById(filmId)).toObject();
    const scheduleIndex = film.schedule.findIndex((s) => s.id === session);
    if (scheduleIndex === -1) {
      throw new NotFoundException(
        `Такого расписания нет для фильма '${film.title}'`,
      );
    }
    return scheduleIndex;
  }

  async createNewFilm(film: CreateFilmDTO): Promise<Film> {
    const films = await this.filmModel.find({});
    if (films.find((f) => f.title === film.title)) {
      throw new BadRequestException(
        `Фильм с таким названием  '${film.title}' уже существует`,
      );
    }
    const newFilm = new this.filmModel({ ...film, id: uuidv4() });
    const createdFilm = await newFilm.save();
    return this.getFilmFromDataBaseFn()(createdFilm);
  }
}
