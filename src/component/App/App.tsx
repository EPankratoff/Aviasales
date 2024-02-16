/* eslint-disable jsx-a11y/anchor-is-valid */
import Filter from '../Filter/Filter';

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
          <aside className={classes['app-main_left']}>
            <Filter />
          </aside>
          <section>asda1</section>
        </main>
      </div>
    </div>
  );
}

export default App;
