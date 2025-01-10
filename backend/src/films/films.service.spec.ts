import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsPostgreSQLRepository } from '../repository/filmsPostgreSQL.repository';
import { CreateFilmDTO, GetFilmDTO, GetScheduleDTO } from './dto/films.dto';
import { FilmEntity } from './entities/film.entity';

describe('FilmsService', () => {
  let service: FilmsService;
  let filmsRepository: FilmsPostgreSQLRepository;

  const mockSchedule: GetScheduleDTO = {
    id: 'schedule-id',
    daytime: '2023-10-10T10:00:00Z',
    hall: 1,
    rows: 5,
    seats: 100,
    price: 10,
    taken: ['1:1', '1:2'],
  };

  const mockFilm: GetFilmDTO = {
    id: 'film-id',
    rating: 8.5,
    director: 'Director Name',
    tags: ['Action', 'Drama'],
    image: 'http://example.com/image.jpg',
    cover: 'http://example.com/cover.jpg',
    title: 'Film Title',
    about: 'About the film',
    description: 'Description of the film',
    schedule: [mockSchedule],
  };

  const mockCreateFilmDTO: CreateFilmDTO = {
    rating: 8.5,
    director: 'Director Name',
    tags: ['Action', 'Drama'],
    image: 'http://example.com/image.jpg',
    cover: 'http://example.com/cover.jpg',
    title: 'Film Title',
    about: 'About the film',
    description: 'Description of the film',
    schedule: [mockSchedule],
  };

  const mockCreateFilmEntity: FilmEntity = {
    id: 'film-id',
    ...mockCreateFilmDTO,
    schedule: [],
  };

  beforeEach(async () => {
    filmsRepository = {
      findAllFilms: jest.fn().mockResolvedValue([mockFilm]),
      findFilmById: jest.fn().mockResolvedValue(mockFilm),
      createNewFilm: jest.fn().mockResolvedValue(mockCreateFilmEntity),
    } as unknown as FilmsPostgreSQLRepository;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: 'FILMS_REPOSITORY',
          useValue: filmsRepository,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  describe('.getAllFilms()', () => {
    it('should be return all films', async () => {
      const result = await service.getAllFilms();
      expect(result).toEqual([mockFilm]);
      expect(filmsRepository.findAllFilms).toHaveBeenCalled();
    });
  });

  describe('.getScheduleFilm()', () => {
    it('should be return schedule for a film', async () => {
      const result = await service.getScheduleFilm('film-id');
      expect(result).toEqual({
        total: 1,
        items: [mockSchedule],
      });
      expect(filmsRepository.findFilmById).toHaveBeenCalledWith('film-id');
    });
  });

  describe('.getNewFilm()', () => {
    it('should be create a new film with FilmEntity in PostgreSQL', async () => {
      const film = await service.getNewFilm(mockCreateFilmEntity);
      expect(film).toEqual(mockCreateFilmEntity);
      expect(filmsRepository.createNewFilm).toHaveBeenCalledWith(
        mockCreateFilmEntity,
      );
    });
  });
});
