import 'components/Button/Button.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as ReactSprite } from 'images/sprite.svg';

class Button extends Component {
  render() {
    return (
      <button
        type={this.props.type}
        className={this.props.class}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        <ReactSprite />
        {this.props.text}

        <svg className={this.props.iconClass}>
          <use href={`#${this.props.iconName}`}></use>
        </svg>
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  iconName: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  contactId: PropTypes.string,
};

export { Button };
