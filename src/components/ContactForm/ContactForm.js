import s from 'components/ContactForm/ContactForm.module.css';

import { Component } from 'react';
import shortId from 'short-id';
import PropTypes from 'prop-types';

import { Button } from 'components/Button/Button';
import classNames from 'classnames';

const nameInputId = shortId.generate();
const numberInputId = shortId.generate();

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label htmlFor={nameInputId} className={s.label}>
          Name
          <input
            type="text"
            name="name"
            id={nameInputId}
            value={this.state.name}
            onChange={this.handleChange}
            className={s.input}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            autoComplete="off"
            required
          />
        </label>
        {this.state.name && (
          <label htmlFor={numberInputId} className={s.emerged}>
            Phone number
            <input
              type="tel"
              name="number"
              id={numberInputId}
              value={this.state.number}
              onChange={this.handleChange}
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
          class={classNames('btn', 'formBtn')}
          iconName={'icon-add'}
          iconClass={'formBtnIcon'}
          text="Add contact"
          disabled={!this.state.number}
        />
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export { ContactForm };
