import s from 'components/Section/Section.module.css';

import PropTypes from 'prop-types';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

function Section({ styledClass, title = '', iconName = '', children = null }) {
  return (
    <div className={s[styledClass]}>
      <ReactSprite />
      {title && (
        <h2 className={s.title}>
          <svg className={s.titleIcon}>
            <use href={`#${iconName}`}></use>
          </svg>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

Section.protoTypes = {
  styledClass: PropTypes.string.isRequired,
  title: PropTypes.string,
  iconName: PropTypes.string,
};

export default Section;
