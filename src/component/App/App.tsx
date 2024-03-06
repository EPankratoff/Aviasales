/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';

import Spinner from '../Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchId, fetchTickets } from '../../store/fetchSlice';
import ButtonTabs from '../ButtonTabs/ButtonTabs';
import Filter from '../Filter/Filter';
import TicketList from '../TicketList/TicketList';

import classes from './App.module.scss';

// eslint-disable-next-line import/no-unresolved
import logo from '/src/assets/Logo.svg';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const storeFetch = useAppSelector((state) => state.fetchReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (storeFetch.searchId && !storeFetch.loading && !storeFetch.stop) {
      dispatch(fetchTickets(storeFetch.searchId));
    }
  }, [storeFetch.searchId, storeFetch.loading, storeFetch.stop, dispatch]);

  const spinner = storeFetch.loading ? <Spinner /> : null;
  const content = !(storeFetch.loading || storeFetch.error) ? <TicketList /> : null;

  return (
    <div className={classes['app-wrapper']}>
      <div className={classes.app}>
        <div className={classes['app-header']}>
          <a href="#">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <main className={classes['app-main']}>
          <aside className={classes['app-main_filter']}>
            <Filter />
          </aside>
          <section className={classes['app-main_ticket']}>
            <ButtonTabs />
            {spinner}
            {content}
            <button type="button" className={classes['app-main_ticket_btn']}>
              Показать еще 5 фильмов
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
