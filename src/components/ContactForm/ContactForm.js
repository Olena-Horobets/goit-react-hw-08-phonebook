import s from 'components/ContactForm/ContactForm.module.css';

import { Component } from 'react';
import shortId from 'short-id';

class ContactForm extends Component {
  state = {
    id: '',
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({ name: e.currentTarget.value, id: e.currentTarget.id });
  };

  handleNumberChange = e => {
    this.setState({ number: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    console.log();
    const nameInputId = shortId.generate();
    const numberInputId = shortId.generate();
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label htmlFor={nameInputId} className={s.label}>
          Name
          <input
            type="text"
            name="name"
            id={nameInputId}
            value={this.state.name}
            onChange={this.handleNameChange}
            className={s.input}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            autoComplete="off"
            required
          />
        </label>
        {this.state.name && (
          <label htmlFor={numberInputId} className={s.label}>
            Phone number
            <input
              type="tel"
              name="number"
              id={numberInputId}
              value={this.state.number}
              onChange={this.handleNumberChange}
              className={s.input}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              autoComplete="off"
              required
            />
          </label>
        )}

        <button type="submit" className={s.btn} disabled={!this.state.number}>
          Add contact
        </button>
      </form>
    );
  }
}

export { ContactForm };
