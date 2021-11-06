import s from 'components/ContactsList/ContactsList.module.css';

import { Component } from 'react';
import PropTypes from 'prop-types';

import { ContactItem } from 'components/ContactItem/ContactItem';

class ContactsList extends Component {
  render() {
    return (
      <ul className={s.list}>
        {this.props.contacts.map(el => {
          return (
            <ContactItem
              key={el.id}
              name={el.name}
              number={el.number}
              isBlocked={el.isBlocked}
              id={el.id}
              onDelete={this.props.onDelete}
              onBlock={this.props.onBlock}
            />
          );
        })}
      </ul>
    );
  }
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
};

export { ContactsList };
