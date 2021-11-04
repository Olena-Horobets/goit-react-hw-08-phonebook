import s from 'components/Button/Button.module.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button
        type={this.props.type}
        className={s[this.props.class]}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  contactId: PropTypes.string,
  class: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export { Button };
