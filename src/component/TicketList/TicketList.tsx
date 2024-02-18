import Ticket from './Ticket/Ticket';
import classes from './TicketList.module.scss';

export default function TicketList() {
  return (
    <div className={classes.list}>
      <Ticket />
      <Ticket />
      <Ticket />
      <Ticket />
    </div>
  );
}
