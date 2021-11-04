import s from 'components/Section/Section.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react/cjs/react.production.min';

class Section extends Component {
  render() {
    return (
      <div className={s[this.props.class]}>
        {this.props.title && <h2 className={s.title}>{this.props.title}</h2>}
        {this.props.children}
      </div>
    );
  }
}

Section.protoTypes = {
  title: PropTypes.string,
};

export default Section;
