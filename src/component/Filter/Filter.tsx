import classes from './Filter.module.scss';

export default function Filter() {
  return (
    <div className={classes.filter}>
      <h2 className={classes['filter-title']}>Количество Пересадок</h2>
      <ul className={classes['filter-list']}>
        <li className={classes['filter-list_item']}>
          <label className={classes['filter-label']}>
            <input className={classes['filter-checkbox']} type="checkbox" />
            <span className={classes['filter-text']}>Все</span>
          </label>
        </li>
        <li className={classes['filter-list_item']}>
          <label className={classes['filter-label']}>
            <input className={classes['filter-checkbox']} type="checkbox" />
            <span className={classes['filter-text']}>Без пересадок</span>
          </label>
        </li>
        <li className={classes['filter-list_item']}>
          <label className={classes['filter-label']}>
            <input className={classes['filter-checkbox']} type="checkbox" />
            <span className={classes['filter-text']}>1 пересадка</span>
          </label>
        </li>
        <li className={classes['filter-list_item']}>
          <label className={classes['filter-label']}>
            <input className={classes['filter-checkbox']} type="checkbox" />
            <span className={classes['filter-text']}>2 пересадки</span>
          </label>
        </li>
        <li className={classes['filter-list_item']}>
          <label className={classes['filter-label']}>
            <input className={classes['filter-checkbox']} type="checkbox" />
            <span className={classes['filter-text']}>3 пересадки</span>
          </label>
        </li>
      </ul>
    </div>
  );
}
