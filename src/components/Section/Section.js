import s from 'components/Section/Section.module.css';

import PropTypes from 'prop-types';
import { Component } from 'react/cjs/react.production.min';

import { ReactComponent as ReactSprite } from 'images/sprite.svg';

class Section extends Component {
  render() {
    return (
      <div className={s[this.props.class]}>
        <ReactSprite />
        {this.props.title && (
          <h2 className={s.title}>
            <svg className={s.titleIcon}>
              <use href={`#${this.props.iconName}`}></use>
            </svg>
            {this.props.title}
          </h2>
        )}
        {this.props.children}
      </div>
    );
  }
}

Section.protoTypes = {
  title: PropTypes.string,
  class: PropTypes.string,
  iconName: PropTypes.string,
};

export default Section;
