/* eslint-disable jsx-a11y/anchor-is-valid */
import ButtonTabs from '../ButtonTabs/ButtonTabs';
import Filter from '../Filter/Filter';
import TicketList from '../TicketList/TicketList';

import classes from './App.module.scss';

// eslint-disable-next-line import/no-unresolved
import logo from '/src/assets/Logo.svg';

function App() {
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
            <TicketList />
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
