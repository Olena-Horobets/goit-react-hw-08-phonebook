import s from 'components/EmptyMessage/EmptyMessage.module.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

class EmptyMessage extends Component {
  render() {
    return <p className={s.message}>{this.props.message}</p>;
  }
}

EmptyMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export { EmptyMessage };
