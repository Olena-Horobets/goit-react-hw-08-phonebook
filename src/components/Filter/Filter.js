import s from 'components/Filter/Filter.module.css';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

import shortId from 'short-id';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { setFilter, resetFilter } from 'store/filter/action-filter';
import {
  resetBlockedRender,
  toggleBlockedRender,
} from 'store/blockedRender/action-blockedRender';

function Filter() {
  const filter = useSelector(state => state.filter);
  const blockedRender = useSelector(state => state.blockedRender);

  const dispatch = useDispatch();

  const radioInpAllId = shortId.generate();
  const radioInpBlockedId = shortId.generate();

  const filterSearchedContactsHandler = e => {
    dispatch(setFilter({ value: e.currentTarget.value }));
    dispatch(resetBlockedRender());
  };

  return (
    <div className={s.wrapper}>
      <ReactSprite />
      <div className={s.renderFilter}>
        <label
          htmlFor={radioInpAllId}
          className={s[blockedRender ? 'renderLabel' : 'renderLabelChecked']}
        >
          All
          <input
            name="renderList"
            id={radioInpAllId}
            className={s.radioInput}
            value="all"
            type="radio"
            checked={!blockedRender}
            onChange={() => dispatch(toggleBlockedRender())}
          ></input>
          <span className={s.renderList}></span>
        </label>
        <label
          htmlFor={radioInpBlockedId}
          className={s[blockedRender ? 'renderLabelChecked' : 'renderLabel']}
        >
          Blocked
          <input
            name="renderList"
            id={radioInpBlockedId}
            className={s.radioInput}
            value="blocked"
            type="radio"
            checked={blockedRender}
            onChange={() => dispatch(toggleBlockedRender())}
          ></input>
          <span className={s.renderList}></span>
        </label>
      </div>

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
