import s from 'components/ContactForm/ContactForm.module.css';

import { useState } from 'react';

import shortId from 'short-id';
import PropTypes from 'prop-types';

import { Button } from 'components/Button/Button';
import classNames from 'classnames';

const nameInputId = shortId.generate();
const numberInputId = shortId.generate();

function ContactForm({ onSubmit }) {
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    name === 'name' ? setContactName(value) : setContactNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name: contactName, number: contactNumber });
    resetForm();
  };

  const resetForm = () => {
    setContactName('');
    setContactNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
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
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
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
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
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
  onSubmit: PropTypes.func.isRequired,
};

export { ContactForm };
