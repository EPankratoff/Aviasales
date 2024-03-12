import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { cheap, fast, optimal } from '../../store/fetchSlice';

import classes from './ButtonTabs.module.scss';

export default function ButtonTabs() {
  const sort = useAppSelector((state) => state.fetchReducer.sortValue);
  const dispatch = useAppDispatch();

  const buttonSortClass = (value: string) =>
    classNames(classes['sort-button'], {
      [classes['sort-button--active']]: sort === value,
    });

  return (
    <div className={classes.sort}>
      <button
        type="button"
        onClick={() => dispatch(cheap(sort))}
        value="cheap"
        className={buttonSortClass('cheap')}
      >
        Самый дешевый
      </button>
      <button
        type="button"
        onClick={() => dispatch(fast(sort))}
        className={buttonSortClass('fast')}
      >
        Самый быстрый
      </button>
      <button
        type="button"
        onClick={() => dispatch(optimal(sort))}
        className={buttonSortClass('optimal')}
      >
        Оптимальный
      </button>
    </div>
  );
}
