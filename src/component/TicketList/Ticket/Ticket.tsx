/* eslint-disable import/no-extraneous-dependencies */

import { addMinutes, format, parseISO } from 'date-fns';

import classes from './Ticket.module.scss';

// eslint-disable-next-line import/no-unresolved
// import logo from '/src/assets/Logo.svg';

type Segment = {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
};

export type TicketData = {
  price: number;
  carrier: string;
  segments: Segment[];
};
interface TicketProps {
  ticketData: TicketData;
}

export default function Ticket({ ticketData }: TicketProps) {
  const segmentOne = ticketData.segments[0];
  const segmentTwo = ticketData.segments[1];

  const parseStartDate = parseISO(segmentOne.date);
  const endDate = addMinutes(parseStartDate, segmentOne.duration);
  const endTime = format(endDate, 'HH:mm');
  const startTime = format(parseStartDate, 'HH:mm');

  const durationInMinutes = segmentOne.duration;

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = segmentOne.duration % 60;

  const parseStartDateTwo = parseISO(segmentTwo.date);
  const endDateTwo = addMinutes(parseStartDateTwo, segmentTwo.duration);
  const endTimeTwo = format(endDateTwo, 'HH:mm');
  const startTimeTwo = format(parseStartDate, 'HH:mm');

  const durationInMinutesTwo = segmentTwo.duration;

  const hoursTwo = Math.floor(durationInMinutesTwo / 60);
  const minutesTwo = segmentTwo.duration % 60;

  const transfersCount = (transfers: Array<string>) => {
    switch (transfers.length) {
      case 0:
        return 'Без пересадок';
      case 1:
        return '1 пересадка';
      case 2:
        return '2 пересадки';
      case 3:
        return '3 пересадки';
      default:
        return '';
    }
  };
  return (
    <article className={classes.ticket}>
      <header className={classes['ticket-header']}>
        <span className={classes['ticket-header-text']}>{ticketData.price} P</span>
        <img
          className={classes['ticket-header-logo']}
          src={`http://pics.avs.io/99/36/${ticketData.carrier}.png`}
          alt="Логотип авиакомпании"
        />
      </header>
      <section className={classes['ticket-route-details']}>
        <dl className={classes['ticket-route-details__item']}>
          <dt
            className={classes['ticket-route-details__item__title']}
          >{`${segmentOne.origin} - ${segmentOne.destination}`}</dt>
          <dd
            className={classes['ticket-route-details__item__time']}
          >{`${startTime} - ${endTime}`}</dd>
        </dl>
        <dl className={classes['ticket-route-details__item']}>
          <dt className={classes['ticket-route-details__item__title']}>В пути</dt>
          <dd className={classes['ticket-route-details__item__time']}>{`${hours}ч ${minutes}м`}</dd>
        </dl>
        <dl className={classes['ticket-route-details__item']}>
          <dt className={classes['ticket-route-details__item__title']}>
            {transfersCount(segmentOne.stops)}
          </dt>
          <dd className={classes['ticket-route-details__item__time']}>
            {segmentOne.stops.join(', ')}
          </dd>
        </dl>
      </section>
      <section className={classes['ticket-route-details']}>
        <dl className={classes['ticket-route-details__item']}>
          <dt
            className={classes['ticket-route-details__item__title']}
          >{`${segmentTwo.origin} - ${segmentTwo.destination}`}</dt>
          <dd
            className={classes['ticket-route-details__item__time']}
          >{`${startTimeTwo} - ${endTimeTwo}`}</dd>
        </dl>
        <dl className={classes['ticket-route-details__item']}>
          <dt className={classes['ticket-route-details__item__title']}>В пути</dt>
          <dd
            className={classes['ticket-route-details__item__time']}
          >{`${hoursTwo}ч ${minutesTwo}м`}</dd>
        </dl>
        <dl className={classes['ticket-route-details__item']}>
          <dt className={classes['ticket-route-details__item__title']}>
            {transfersCount(segmentTwo.stops)}
          </dt>
          <dd className={classes['ticket-route-details__item__time']}>
            {segmentTwo.stops.join(', ')}
          </dd>
        </dl>
      </section>
    </article>
  );
}
