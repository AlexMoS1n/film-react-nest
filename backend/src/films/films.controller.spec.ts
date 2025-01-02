import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { CreateFilmDTO } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const arrMockFilms = [
    {
      id: '1',
      title: 'Архитекторы общества',
      schedule: [
        {
          id: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
          daytime: '2024-06-28T10:00:53+03:00',
          hall: 0,
          rows: 5,
          seats: 10,
          price: 350,
          taken: [],
        },
        {
          id: '5beec101-acbb-4158-adc6-d855716b44a8',
          daytime: '2024-06-28T14:00:53+03:00',
          hall: 1,
          rows: 5,
          seats: 10,
          price: 350,
          taken: [],
        },
      ],
    },
    {
      id: '2',
      title: 'Недостижимая утопия',
      schedule: [
        {
          id: '9647fcf2-d0fa-4e69-ad90-2b23cff15449',
          daytime: '2024-06-28T10:00:53+03:00',
          hall: 0,
          rows: 5,
          seats: 10,
          price: 350,
          taken: [],
        },
        {
          id: '9f2db237-01d0-463e-a150-89f30bfc4250',
          daytime: '2024-06-28T14:00:53+03:00',
          hall: 1,
          rows: 5,
          seats: 10,
          price: 350,
          taken: [],
        },
      ],
    },
  ];

  const newFilm: CreateFilmDTO = {
    rating: 9,
    director: 'Харрисон Рид',
    tags: ['Рекомендуемые'],
    image: '/bg3s.jpg',
    cover: '/bg3c.jpg',
    title: 'Недостижимая утопия',
    about:
      'Провокационный фильм-антиутопия, исследующий темы свободы, контроля и цены совершенства.',
    description:
      'Провокационный фильм-антиутопия режиссера Харрисона Рида. Действие фильма разворачивается в, казалось бы, идеальном обществе, и рассказывает о группе граждан, которые начинают подвергать сомнению систему. Фильм исследует темы свободы, контроля и цены совершенства.',
    schedule: [
      {
        id: '9647fcf2-d0fa-4e69-ad90-2b23cff15449',
        daytime: '2024-06-28T10:00:53+03:00',
        hall: 0,
        rows: 5,
        seats: 10,
        price: 350,
        taken: [],
      },
    ],
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getAllFilms: jest.fn().mockResolvedValue(arrMockFilms),
        getScheduleFilm: jest.fn().mockResolvedValue({
          total: arrMockFilms[1].schedule.length,
          items: arrMockFilms[1].schedule,
        }),
        getNewFilm: jest.fn().mockResolvedValue(newFilm),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('.getFilms() should be return an array of films', async () => {
    const result = await controller.getFilms();
    expect(result).toEqual(arrMockFilms);
    expect(service.getAllFilms).toHaveBeenCalled();
  });

  it('.getSchedule() should be return the schedule of a film', async () => {
    const result = await controller.getSchedule('1');
    expect(result).toEqual({
      total: arrMockFilms[1].schedule.length,
      items: arrMockFilms[1].schedule,
    });
    expect(service.getScheduleFilm).toHaveBeenCalledWith('1');
  });

  it('.createFilm() should be create a new film', async () => {
    const result = await controller.createFilm(newFilm);
    expect(result).toEqual(newFilm);
    expect(service.getNewFilm).toHaveBeenCalledWith(newFilm);
  });
});
