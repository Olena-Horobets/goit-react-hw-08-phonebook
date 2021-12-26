import s from 'components/Filter/Filter.module.css';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

import { useSelector, useDispatch } from 'react-redux';

import { setFilter, resetFilter } from 'store/filter/actions-filter';

function Filter() {
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const filterSearchedContactsHandler = e => {
    dispatch(setFilter({ value: e.currentTarget.value }));
  };

  return (
    <div className={s.wrapper}>
      <ReactSprite />

      <div className={s.filter}>
        <svg className={s.filterIcon}>
          <use href={'#icon-search'}></use>
        </svg>
        <input
          className={s.filterInput}
          name="filter"
          type="text"
          value={filter}
          onChange={filterSearchedContactsHandler}
          autoComplete="off"
        ></input>
        <button
          className={filter ? s.filterBtnEmerged : s.filterBtn}
          onClick={() => dispatch(resetFilter())}
        >
          {' '}
          X{' '}
        </button>
      </div>
    </div>
  );
}

export { Filter };
