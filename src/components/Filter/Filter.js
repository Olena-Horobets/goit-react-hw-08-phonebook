import s from 'components/Filter/Filter.module.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    return (
      <div className={s.filter}>
        <span className={s.filterIcon}></span>

        <input
          className={s.filterInput}
          name="filter"
          type="text"
          onChange={this.props.onSearch}
          autoComplete="off"
        ></input>
      </div>
    );
  }
}

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export { Filter };
