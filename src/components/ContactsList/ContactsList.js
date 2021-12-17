import s from 'components/ContactsList/ContactsList.module.css';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';

function ContactsList({ contacts }) {
  const [sortedContacts, setsortedContacts] = useState([]);
  const [firstLettersArr, setFirstLettersArr] = useState([]);
  const [subListsArr, setSubListsArr] = useState([]);

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

  useEffect(() => {
    if (sortedContacts.length) {
      let letters = [];
      let arrs = [];

      sortedContacts.reduce((acc, el, idx, arr) => {
        const firstLetter = el.name[0].toUpperCase();

        if (!letters.includes(firstLetter)) {
          letters.push(firstLetter);
          if (idx !== 0) arrs.push(acc);
          acc = [el];
        } else {
          acc.push(el);
        }

        if (idx === arr.length - 1) arrs.push(acc);
        return acc;
      }, []);

      setFirstLettersArr([...letters]);
      setSubListsArr([...arrs]);
    }
  }, [sortedContacts]);

  return (
    <ul className={s.list}>
      {firstLettersArr.map((el, idx) => (
        <li className={s.item} key={idx}>
          <span className={s.accentLetter}>{el}</span>

          <ul className={s.subList}>
            {subListsArr[idx].map(contact => (
              <ContactItem
                key={contact.id}
                name={contact.name}
                number={contact.number}
                isBlocked={contact.isBlocked}
                id={contact.id}
              />
            ))}
          </ul>
        </li>
      ))}
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
