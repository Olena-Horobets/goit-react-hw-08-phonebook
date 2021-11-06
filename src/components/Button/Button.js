import 'components/Button/Button.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button
        type={this.props.type}
        className={this.props.class}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        {this.props.text}
        <span className={this.props.iconClass}></span>
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  contactId: PropTypes.string,
};

export { Button };
