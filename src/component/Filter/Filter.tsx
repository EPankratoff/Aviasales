// eslint-disable-next-line import/order
import { all, one, two, tree, without } from '../../store/filterSlice';

// eslint-disable-next-line import/no-extraneous-dependencies

import { useAppDispatch, useAppSelector } from '../../hooks';

import classes from './Filter.module.scss';

export default function Filter() {
  const filter = useAppSelector((state) => state.filterReducer);
  const dispatch = useAppDispatch();
  const prevSum = +filter.without + +filter.one + +filter.two + +filter.tree;

  return (
    <div className={classes.filter}>
      <h2 className={classes['filter-title']}>Количество Пересадок</h2>
      <ul className={classes['filter-list']}>
        <li className={classes['filter-list_item']}>
          <label className={classes['filter-label']}>
            <input
              className={classes['filter-checkbox']}
              type="checkbox"
              checked={filter.all}
              onChange={() => dispatch(all(prevSum))}
            />
            <span className={classes['filter-text']}>Все</span>
          </label>
        </li>
        <li className={classes['filter-list_item']}>
          <label className={classes['filter-label']}>
            <input
              className={classes['filter-checkbox']}
              checked={filter.without}
              type="checkbox"
              onChange={() => dispatch(without(prevSum))}
            />
            <span className={classes['filter-text']}>Без пересадок</span>
          </label>
        </li>
        <li className={classes['filter-list_item']}>
          <label className={classes['filter-label']}>
            <input
              className={classes['filter-checkbox']}
              checked={filter.one}
              onChange={() => dispatch(one(prevSum))}
              type="checkbox"
            />
            <span className={classes['filter-text']}>1 пересадка</span>
          </label>
        </li>
        <li className={classes['filter-list_item']}>
          <label className={classes['filter-label']}>
            <input
              className={classes['filter-checkbox']}
              checked={filter.two}
              onChange={() => dispatch(two(prevSum))}
              type="checkbox"
            />
            <span className={classes['filter-text']}>2 пересадки</span>
          </label>
        </li>
        <li className={classes['filter-list_item']}>
          <label className={classes['filter-label']}>
            <input
              className={classes['filter-checkbox']}
              checked={filter.tree}
              onChange={() => dispatch(tree(prevSum))}
              type="checkbox"
            />
            <span className={classes['filter-text']}>3 пересадки</span>
          </label>
        </li>
      </ul>
    </div>
  );
}
