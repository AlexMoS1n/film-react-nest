import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { CreateFilmDTO, GetFilmDTO, GetScheduleDTO } from './dto/films.dto';
import { FilmEntity } from './entities/film.entity';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockSchedule: GetScheduleDTO = {
    id: 'schedule-id',
    daytime: '2023-10-10T10:00:00Z',
    hall: 1,
    rows: 5,
    seats: 100,
    price: 10,
    taken: [],
  };

  const mockFilm: GetFilmDTO = {
    id: 'film-id',
    rating: 8.5,
    director: 'Харрисон Рид',
    tags: ['Рекомендуемые'],
    image: 'http://example.com/image.jpg',
    cover: 'http://example.com/cover.jpg',
    title: 'Film Title',
    about: 'About the film',
    description: 'Description of the film',
    schedule: [mockSchedule],
  };

  const mockCreateFilmDTO: CreateFilmDTO = {
    rating: 8.5,
    director: 'Харрисон Рид',
    tags: ['Рекомендуемые'],
    image: 'http://example.com/image.jpg',
    cover: 'http://example.com/cover.jpg',
    title: 'Film Title New',
    about: 'About the film',
    description: 'Description of the film',
    schedule: [mockSchedule],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getAllFilms: jest.fn().mockResolvedValue([mockFilm]),
        getScheduleFilm: jest.fn().mockResolvedValue(mockSchedule),
        getNewFilm: jest.fn(),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  describe('.getFilms()', () => {
    it('should be return all films', async () => {
      const result = await controller.getFilms();
      expect(result).toEqual([mockFilm]);
      expect(service.getAllFilms).toHaveBeenCalled();
    });
  });

  describe('.getSchedule()', () => {
    it('should be return schedule for a film', async () => {
      const result = await controller.getSchedule('film-id');
      expect(result).toEqual(mockSchedule);
      expect(service.getScheduleFilm).toHaveBeenCalledWith('film-id');
    });
  });

  describe('.createFilm()', () => {
    it('should be create a new film with CreateFilmDTO', async () => {
      (service.getNewFilm as jest.Mock).mockResolvedValue(mockFilm);

      const result = await controller.createFilm(mockCreateFilmDTO);

      expect(result).toEqual(mockFilm);
      expect(service.getNewFilm).toHaveBeenCalledWith(mockCreateFilmDTO);
    });

    it('should be create a new film with FilmEntity', async () => {
      const filmEntity: FilmEntity = {
        id: 'film-id',
        rating: 8.5,
        director: 'Director Name',
        tags: ['Action', 'Drama'],
        image: 'http://example.com/image.jpg',
        cover: 'http://example.com/cover.jpg',
        title: 'Film Title',
        about: 'About the film',
        description: 'Description of the film',
        schedule: [],
      };

      (service.getNewFilm as jest.Mock).mockResolvedValue(filmEntity);

      const result = await controller.createFilm(filmEntity);

      expect(result).toEqual(filmEntity);
      expect(service.getNewFilm).toHaveBeenCalledWith(filmEntity);
    });
  });
});
