/* eslint-disable no-continue */
import type { TicketData } from '../TicketList/Ticket/Ticket';
import store from '../../store';

const ticketsLimit = 5;

export default function takeFiveTickets(more: boolean): {
  displayedTickets: TicketData[];
  currentIdx: number;
  stop: boolean;
} {
  const storeFetch = store.getState().fetchReducer;
  const storeTicketsList = store.getState().ticketListReducer;
  const storeFilter = store.getState().filterReducer;

  const displayedTickets: TicketData[] = [];
  const ticketsLength = storeFetch.tickets.length;
  let newCurrentIdx = storeTicketsList.currentIdx;

  if (!more) newCurrentIdx = 0;

  if (!storeFilter.without && !storeFilter.one && !storeFilter.two && !storeFilter.tree) {
    return {
      displayedTickets,
      currentIdx: newCurrentIdx,
      stop: storeFetch.stop,
    };
  }

  for (let i = 0; i < ticketsLimit && newCurrentIdx < ticketsLength; ) {
    const oneWayStopsNumber = storeFetch.tickets[newCurrentIdx].segments[0].stops.length;
    const returnStopsNumber = storeFetch.tickets[newCurrentIdx].segments[1].stops.length;
    const maxStops = Math.max(oneWayStopsNumber, returnStopsNumber);

    if (maxStops === 0 && storeFilter.without) {
      displayedTickets.push(storeFetch.tickets[newCurrentIdx]);
      i += 1;
      newCurrentIdx += 1;
      continue;
    }
    if (maxStops === 1 && storeFilter.one) {
      displayedTickets.push(storeFetch.tickets[newCurrentIdx]);
      i += 1;
      newCurrentIdx += 1;
      continue;
    }
    if (maxStops === 2 && storeFilter.two) {
      displayedTickets.push(storeFetch.tickets[newCurrentIdx]);
      i += 1;
      newCurrentIdx += 1;
      continue;
    }
    if (maxStops === 3 && storeFilter.tree) {
      displayedTickets.push(storeFetch.tickets[newCurrentIdx]);
      i += 1;
      newCurrentIdx += 1;
      continue;
    }
    newCurrentIdx += 1;
  }

  return {
    displayedTickets,
    currentIdx: newCurrentIdx,
    stop: storeFetch.stop,
  };
}
