/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { asyncSort, fetchSearchId, fetchTickets } from '../../store/fetchSlice';
import ButtonTabs from '../ButtonTabs/ButtonTabs';
import Filter from '../Filter/Filter';
import { fiveMore, takeFive } from '../../store/ticketListSlice';
import TicketList from '../TicketList/TicketList';
import takeFiveTickets from '../filterFunction/filterFunction';

import classes from './App.module.scss';

import Plane from '/src/assets/Plane.svg';
import Form from '/src/assets/Form.svg';

function App() {
  const storeFetch = useAppSelector((state) => state.fetchReducer);
  const dispatch = useAppDispatch();
  const storeTicketsList = useAppSelector((state) => state.ticketListReducer);
  const storeSort = useAppSelector((state) => state.fetchReducer.sortValue);
  const storeFilter = useAppSelector((state) => state.filterReducer);

  function takeFirstFive() {
    dispatch(takeFive(takeFiveTickets(false)));
  }

  function takeFiveMore() {
    dispatch(fiveMore(takeFiveTickets(true)));
  }

  useEffect(() => {
    dispatch(fetchSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (storeFetch.searchId && !storeFetch.loading && !storeFetch.stop) {
      dispatch(fetchTickets(storeFetch.searchId));
    }
  }, [storeFetch.searchId, storeFetch.loading, storeFetch.stop, storeSort, dispatch]);

  useEffect(() => {
    dispatch(asyncSort({ sortValue: storeSort, ticket: storeFetch.tickets }));
  }, [storeSort, dispatch]);

  useEffect(() => {
    if (storeFetch.tickets.length > 0 && !storeFetch.loading) {
      takeFirstFive();
    }
  }, [storeFetch.tickets, storeFetch.loading, storeFilter]);

  const logoClass = () =>
    classNames(classes['app-header_plane_img'], {
      [classes['app-header_plane_img_onload']]: storeFetch.loading,
    });

  return (
    <div className={classes['app-wrapper']}>
      <div className={classes.app}>
        <div className={classes['app-header']}>
          <div className={classes['app-header_plane']}>
            <img src={Plane} alt="Plane" className={logoClass()} />
          </div>
          <img src={Form} alt="Form" className={classes['app-header_form']} />
        </div>
        <main className={classes['app-main']}>
          <aside className={classes['app-main_filter']}>
            <Filter />
          </aside>

          <section className={classes['app-main_ticket']}>
            <ButtonTabs />
            {!storeTicketsList.renderedTickets.length ? (
              <div className={classes['app-main_message']}>
                {' '}
                Рейсов, подходящих под заданные фильтры, не найдено
              </div>
            ) : (
              <TicketList />
            )}

            <button
              type="button"
              onClick={() => !storeFetch.loading && takeFiveMore()}
              className={classes['app-main_ticket_btn']}
            >
              Показать еще 5 фильмов
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
