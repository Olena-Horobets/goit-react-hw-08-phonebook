import s from 'components/ContactsList/ContactsList.module.css';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';

function ContactsList({ contacts }) {
  const [sortedContacts, setsortedContacts] = useState([]);

  useEffect(() => {
    const makeSortedContacts = () => {
      return [...contacts].sort((x, y) => {
        let a = x.name.toUpperCase(),
          b = y.name.toUpperCase();
        return a === b ? 0 : a > b ? 1 : -1;
      });
    };

    setsortedContacts(makeSortedContacts());
  }, [contacts]);

  return (
    <ul className={s.list}>
      {sortedContacts.map(el => {
        return (
          <ContactItem
            key={el.id}
            name={el.name}
            number={el.number}
            isBlocked={el.isBlocked}
            id={el.id}
          />
        );
      })}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
};

export { ContactsList };
