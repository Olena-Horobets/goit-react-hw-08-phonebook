import s from 'components/ContactsList/ContactsList.module.css';

import PropTypes from 'prop-types';

import { ContactItem } from 'components/ContactItem/ContactItem';

import { getContactsSublists } from 'services/getContactsSublists';

function ContactsList({ contacts }) {
  const { firstLettersArr, subListsArr } = getContactsSublists(contacts);

  return (
    <ul className={s.list}>
      {firstLettersArr.map((el, idx) => (
        <li className={s.item} key={idx}>
          <span className={s.accentLetter}>{el}</span>

          <ul className={s.subList}>
            {subListsArr[idx].map(contact => (
              <li className={s.subItem} key={contact.id}>
                <ContactItem
                  name={contact.name}
                  number={contact.number}
                  isBlocked={contact.isBlocked}
                  id={contact.id}
                />
              </li>
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
