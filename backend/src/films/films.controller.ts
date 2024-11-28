import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { FilmsService } from './films.service';
import { CreateFilmDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getFilms() {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  getScheduleFilm(@Param('id') id: string) {
    return this.filmsService.findById(id);
  }

  @Post('/create')
  create(@Body() newFilm: CreateFilmDTO) {
    return this.filmsService.create(newFilm);
  }
}
