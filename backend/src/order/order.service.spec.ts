import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsPostgreSQLRepository } from '../repository/filmsPostgreSQL.repository';
import { GetOrderDTO, GetTicketDTO } from './dto/order.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;
  let filmsRepository: FilmsPostgreSQLRepository;

  const mockFilm = {
    id: 'film-id',
    title: 'Film Title',
    schedule: [
      {
        id: 'session-id',
        taken: '2:2',
      },
    ],
  };

  const mockTickets: GetTicketDTO[] = [
    {
      film: 'film-id',
      session: 'session-id',
      daytime: '2025-01-01',
      day: 'Wednesday',
      time: '20:00',
      row: 1,
      seat: 1,
      price: 500,
    },
  ];

  const mockOrderData: GetOrderDTO = {
    tickets: mockTickets,
    email: 'test@example.com',
    phone: '+79001234567',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'FILMS_REPOSITORY',
          useValue: {
            findFilmById: jest.fn().mockResolvedValue(mockFilm),
            findScheduleIndexInFilm: jest.fn().mockResolvedValue(0),
            updateFilm: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    filmsRepository = module.get('FILMS_REPOSITORY');
  });

  describe('.createOrder()', () => {
    it('should be create an order successfully', async () => {
      const result = await service.createOrder(mockOrderData);
      expect(result).toEqual({ items: mockTickets, total: 1 });
      expect(filmsRepository.findFilmById).toHaveBeenCalledWith('film-id');
      expect(filmsRepository.findScheduleIndexInFilm).toHaveBeenCalledWith(
        'film-id',
        'session-id',
      );
      expect(filmsRepository.updateFilm).toHaveBeenCalled();
    });

    it('should be throw BadRequestException if seat is already taken (PostgreSQL)', async () => {
      mockFilm.schedule[0].taken = '1:1';
      await expect(service.createOrder(mockOrderData)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('.updateOccupiedSeatsFilmSession()', () => {
    it('should be update occupied seats for PostgreSQL', async () => {
      await service.updateOccupiedSeatsFilmSession('film-id', 0, '1:1');
      expect(filmsRepository.updateFilm).toHaveBeenCalled();
    });

    it('should be throw ConflictException if there is an error updating film in PostgreSQL', async () => {
      (filmsRepository.updateFilm as jest.Mock).mockRejectedValue(
        new Error('Error'),
      );
      await expect(
        service.updateOccupiedSeatsFilmSession('film-id', 0, '2:2'),
      ).rejects.toThrow(ConflictException);
    });
  });
});
