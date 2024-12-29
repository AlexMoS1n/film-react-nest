import { Controller, Get, Post, Param, Body } from '@nestjs/common';

import { FilmsService } from './films.service';
import { CreateFilmDTO } from './dto/films.dto';
import { FilmEntity } from './entities/film.entity';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getFilms() {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  getSchedule(@Param('id') id: string) {
    return this.filmsService.getScheduleFilm(id);
  }

  @Post('create')
  createFilm(@Body() newFilm: CreateFilmDTO | FilmEntity) {
    return this.filmsService.getNewFilm(newFilm);
  }
}
