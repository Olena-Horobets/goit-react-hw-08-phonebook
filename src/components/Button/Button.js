import s from 'components/Button/Button.module.css';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';
import PropTypes from 'prop-types';

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
      className={s[styledClass]}
      disabled={disabled}
      onClick={onClick}
    >
      <ReactSprite />
      {text}

      <svg className={s[iconClass]}>
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
