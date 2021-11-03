import { Component } from 'react';
import shortId from 'short-id';

class ContactForm extends Component {
  state = {
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
    this.setState({ name: '' });
  };

  render() {
    console.log();
    const nameInputId = shortId.generate();
    const telInputId = shortId.generate();
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={nameInputId}>
          Name
          <input
            type="text"
            name="name"
            id={nameInputId}
            value={this.state.name}
            onChange={this.handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            autoComplete="off"
            required
          />
        </label>
        {this.state.name && (
          <label>
            Phone number
            <input
              type="tel"
              name="number"
              id={telInputId}
              value={this.state.number}
              onChange={this.handleNumberChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
          </label>
        )}

        <button type="submit" disabled={!this.state.number}>
          Add contact
        </button>
      </form>
    );
  }
}

export { ContactForm };
