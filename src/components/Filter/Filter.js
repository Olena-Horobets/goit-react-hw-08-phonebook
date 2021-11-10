import s from 'components/Filter/Filter.module.css';

import { Component } from 'react';
import shortId from 'short-id';
import PropTypes from 'prop-types';

import { ReactComponent as ReactSprite } from 'images/sprite.svg';

class Filter extends Component {
  render() {
    const radioInpAllId = shortId.generate();
    const radioInpBlockedId = shortId.generate();

    return (
      <div className={s.wrapper}>
        <ReactSprite />
        <div className={s.renderFilter}>
          <label
            htmlFor={radioInpAllId}
            className={
              s[this.props.renderBlocked ? 'renderLabel' : 'renderLabelChecked']
            }
          >
            All
            <input
              name="renderList"
              id={radioInpAllId}
              className={s.radioInput}
              value="all"
              type="radio"
              checked={!this.props.renderBlocked}
              onChange={this.props.onBlockedFilter}
            ></input>
            <span className={s.renderList}></span>
          </label>
          <label
            htmlFor={radioInpBlockedId}
            className={
              s[this.props.renderBlocked ? 'renderLabelChecked' : 'renderLabel']
            }
          >
            Blocked
            <input
              name="renderList"
              id={radioInpBlockedId}
              className={s.radioInput}
              value="blocked"
              type="radio"
              checked={this.props.renderBlocked}
              onChange={this.props.onBlockedFilter}
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
            value={this.props.searchValue}
            onChange={this.props.onSearch}
            autoComplete="off"
          ></input>
          <button
            className={s[this.props.btnClass]}
            onClick={this.props.onClearFilter}
          >
            {' '}
            X{' '}
          </button>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
  onBlockedFilter: PropTypes.func,
  renderBlocked: PropTypes.bool,
};

export { Filter };
