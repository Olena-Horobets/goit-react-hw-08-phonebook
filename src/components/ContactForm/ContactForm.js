import s from 'components/ContactForm/ContactForm.module.css';

import { useState } from 'react';

import { useAddContactMutation } from 'store/contacts/contsctsAPI';
import { GetVisibleContacts } from 'services/getVisibleContacts';

import shortId from 'short-id';
import PropTypes from 'prop-types';

import { Button } from 'components/Button/Button';
import classNames from 'classnames';

const nameInputId = shortId.generate();
const numberInputId = shortId.generate();

function ContactForm({ toast }) {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [addContact] = useAddContactMutation();
  const { contacts } = GetVisibleContacts();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    name === 'name' ? setContactName(value) : setContactNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const savedContact = contacts?.find(el => el.number === contactNumber);
    if (savedContact) {
      toast.error(
        `This number is already saved under "${savedContact.name.toUpperCase()}" name`,
      );
      return;
    }

    if (contacts?.some(el => el.name === contactName)) {
      const newName = prompt(
        'This name is alreday used. Please, use different name',
      );
      setContactName(newName);
    }

    addContact({ name: contactName, number: contactNumber });

    toast.success(
      `Contact "${contactName.toUpperCase()}" added to your list successfully!`,
    );
    resetForm();
  };

  const resetForm = () => {
    setContactName('');
    setContactNumber('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={!contactName ? s.form : s.higherForm}
    >
      <label htmlFor={nameInputId} className={s.label}>
        Name
        <input
          type="text"
          name="name"
          id={nameInputId}
          value={contactName}
          onChange={handleChange}
          className={s.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name can only consist of letters, spaces and apostrophies, such as Jacob Mercer, Charles de Batz, d'Artagnan, etc"
          autoComplete="off"
          required
        />
      </label>
      {contactName && (
        <label htmlFor={numberInputId} className={s.emerged}>
          Phone number
          <input
            type="tel"
            name="number"
            id={numberInputId}
            value={contactNumber}
            onChange={handleChange}
            className={s.input}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number can only consist of numbers, spaces, dashes, parentheses and can also start with +"
            autoComplete="off"
            required
          />
        </label>
      )}

      <Button
        type="submit"
        styledClass={classNames('btn', 'formBtn')}
        iconName={'icon-add'}
        iconClass={'formBtnIcon'}
        text="Add contact"
        disabled={!contactNumber}
      />
    </form>
  );
}

ContactForm.propTypes = {
  toast: PropTypes.func,
};

export { ContactForm };
