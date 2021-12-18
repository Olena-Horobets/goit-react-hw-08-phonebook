import s from './Loader.module.css';

import PropTypes from 'prop-types';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

function Loader({ color, size }) {
  return (
    <div className={s.loaderContainer}>
      <ReactSprite />
      <svg width={size} height={size} fill={color} className={s.icon}>
        <use href="#icon-spinner"></use>
      </svg>
    </div>
  );
}

Loader.protoTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export { Loader };
