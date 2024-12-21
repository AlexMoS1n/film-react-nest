import { Injectable } from '@nestjs/common';
import { BadRequestException, ConflictException } from '@nestjs/common';

import { FilmsMongoDBRepository } from '../repository/filmsMongoDB.repository';
import { GetTicketDTO, GetOrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsMongoDBRepository) {}

  async createOrder(
    orderData: GetOrderDTO,
  ): Promise<{ items: GetTicketDTO[]; total: number }> {
    const tickets = orderData.tickets;
    for (const ticket of tickets) {
      const film = (
        await this.filmsRepository.findFilmById(ticket.film)
      ).toObject();
      const scheduleIndex = await this.filmsRepository.findScheduleIndexInFilm(
        ticket.film,
        ticket.session,
      );
      const place = `${ticket.row}:${ticket.seat}`;

      if (film.schedule[scheduleIndex].taken.includes(place)) {
        throw new BadRequestException(
          `К сожалению данное место ${place} уже забронировано другим посетителем`,
        );
      }
      this.updateOccupiedSeatsFilmSession(ticket.film, scheduleIndex, place);
    }
    return { items: tickets, total: tickets.length };
  }

  async updateOccupiedSeatsFilmSession(
    filmId: string,
    scheduleIndex: number,
    place: string,
  ): Promise<void> {
    const film = await this.filmsRepository.findFilmById(filmId);
    const scheduleTakenPlace = `schedule.${scheduleIndex.toString()}.taken`;
    try {
      await film.updateOne({ $push: { [scheduleTakenPlace]: place } });
    } catch (error) {
      new ConflictException('Возникла ошибка при обновлении данных в таблице');
    }
  }
}
