/* eslint-disable import/no-extraneous-dependencies */
import uniqid from 'uniqid';

import { useAppSelector } from '../../hooks';

import Ticket from './Ticket/Ticket';
import classes from './TicketList.module.scss';

export default function TicketList() {
  const storeTicketsList = useAppSelector((state) => state.fetchReducer);
  const tiketsItem = storeTicketsList.tickets.map((ticket) => (
    <li key={uniqid.time('ticket:')}>
      <Ticket ticketData={ticket} />
    </li>
  ));
  return <ul className={classes.list}>{tiketsItem}</ul>;
}
