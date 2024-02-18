import classes from './ButtonTabs.module.scss';

export default function ButtonTabs() {
  return (
    <div className={classes.sort}>
      <button type="button" className={classes['sort-button']}>
        Самый дешевый
      </button>
      <button type="button" className={classes['sort-button']}>
        Самый быстрый
      </button>
      <button type="button" className={classes['sort-button']}>
        Оптимальный
      </button>
    </div>
  );
}
