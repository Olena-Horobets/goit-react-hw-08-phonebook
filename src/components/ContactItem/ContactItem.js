import s from 'components/ContactItem/ContactItem.module.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

class ContactItem extends Component {
  state = {};

  render() {
    return (
      <li className={s.item}>
        {this.props.name} - {this.props.number}
      </li>
    );
  }
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export { ContactItem };
