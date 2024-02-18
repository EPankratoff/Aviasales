import classes from './Ticket.module.scss';

// eslint-disable-next-line import/no-unresolved
import logo from '/src/assets/Logo.svg';

export default function Ticket() {
  return (
    <article className={classes.ticket}>
      <header className={classes['ticket-header']}>
        <span className={classes['ticket-header-text']}>13400 P</span>
        <img className={classes['ticket-header-logo']} src={logo} alt="Логотип авиакомпании" />
      </header>
      <section className={classes['ticket-route-details']}>
        <dl className={classes['ticket-route-details__item']}>
          <dt className={classes['ticket-route-details__item__title']}>MOW – HKT</dt>
          <dd className={classes['ticket-route-details__item__time']}>10:45 – 08:00</dd>
        </dl>
        <dl className={classes['ticket-route-details__item']}>
          <dt className={classes['ticket-route-details__item__title']}>В пути</dt>
          <dd className={classes['ticket-route-details__item__time']}>21ч 15м</dd>
        </dl>
        <dl className={classes['ticket-route-details__item']}>
          <dt className={classes['ticket-route-details__item__title']}>2 пересадки</dt>
          <dd className={classes['ticket-route-details__item__time']}>HKG, JNB</dd>
        </dl>
      </section>
      <section className={classes['ticket-route-details']}>
        <dl className={classes['ticket-route-details__item']}>
          <dt className={classes['ticket-route-details__item__title']}>MOW – HKT</dt>
          <dd className={classes['ticket-route-details__item__time']}>11:20 – 00:50</dd>
        </dl>
        <dl className={classes['ticket-route-details__item']}>
          <dt className={classes['ticket-route-details__item__title']}>В пути</dt>
          <dd className={classes['ticket-route-details__item__time']}>13ч 30м</dd>
        </dl>
        <dl className={classes['ticket-route-details__item']}>
          <dt className={classes['ticket-route-details__item__title']}>2 пересадки</dt>
          <dd className={classes['ticket-route-details__item__time']}>HKG</dd>
        </dl>
      </section>
    </article>
  );
}
