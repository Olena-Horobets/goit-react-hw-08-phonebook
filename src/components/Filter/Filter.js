import s from 'components/Filter/Filter.module.css';

import shortId from 'short-id';
import PropTypes from 'prop-types';

import { ReactComponent as ReactSprite } from 'images/sprite.svg';

function Filter({
  onSearch,
  onClearFilter,
  searchValue,
  btnClass,
  onBlockedFilter,
  renderBlocked,
}) {
  const radioInpAllId = shortId.generate();
  const radioInpBlockedId = shortId.generate();

  return (
    <div className={s.wrapper}>
      <ReactSprite />
      <div className={s.renderFilter}>
        <label
          htmlFor={radioInpAllId}
          className={s[renderBlocked ? 'renderLabel' : 'renderLabelChecked']}
        >
          All
          <input
            name="renderList"
            id={radioInpAllId}
            className={s.radioInput}
            value="all"
            type="radio"
            checked={!renderBlocked}
            onChange={onBlockedFilter}
          ></input>
          <span className={s.renderList}></span>
        </label>
        <label
          htmlFor={radioInpBlockedId}
          className={s[renderBlocked ? 'renderLabelChecked' : 'renderLabel']}
        >
          Blocked
          <input
            name="renderList"
            id={radioInpBlockedId}
            className={s.radioInput}
            value="blocked"
            type="radio"
            checked={renderBlocked}
            onChange={onBlockedFilter}
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
          value={searchValue}
          onChange={onSearch}
          autoComplete="off"
        ></input>
        <button className={s[btnClass]} onClick={onClearFilter}>
          {' '}
          X{' '}
        </button>
      </div>
    </div>
  );
}

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
  onBlockedFilter: PropTypes.func.isRequired,
  renderBlocked: PropTypes.bool.isRequired,
};

export { Filter };
