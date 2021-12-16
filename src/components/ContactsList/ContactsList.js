import s from 'components/ContactsList/ContactsList.module.css';

import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';

function ContactsList({ contacts, onBlock }) {
  return (
    <ul className={s.list}>
      {contacts.map(el => {
        return (
          <ContactItem
            key={el.id}
            name={el.name}
            number={el.number}
            isBlocked={el.isBlocked}
            id={el.id}
            onBlock={onBlock}
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
  onBlock: PropTypes.func.isRequired,
};

export { ContactsList };
