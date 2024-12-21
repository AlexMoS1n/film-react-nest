import { Controller, Get, Param,/* Post, Body */} from '@nestjs/common';

import { FilmsService } from './films.service';
//import { CreateFilmDTO } from './dto/films.dto';

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

  /* @Post('create')
  createFilm(@Body() newFilm: CreateFilmDTO) {
    return this.filmsService.getNewFilm(newFilm);
  }*/
}
