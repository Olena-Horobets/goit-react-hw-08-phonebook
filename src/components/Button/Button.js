import 'components/Button/Button.css';

import PropTypes from 'prop-types';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

function Button({
  type,
  styledClass,
  iconClass = '',
  iconName = '',
  text = '',
  disabled = false,
  onClick = null,
}) {
  return (
    <button
      type={type}
      className={styledClass}
      disabled={disabled}
      onClick={onClick}
    >
      <ReactSprite />
      {text}

      <svg className={iconClass}>
        <use href={`#${iconName}`}></use>
      </svg>
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  styledClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  iconName: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export { Button };
