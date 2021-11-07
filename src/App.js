import 'App.css';

import { Component } from 'react';
import shortId from 'short-id';

import Section from 'components/Section/Section';
import { Header } from 'components/Header/Header';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { EmptyMessage } from 'components/EmptyMessage/EmptyMessage';

import INITIAL_DB from 'db/initialDB.json';

class App extends Component {
  state = {
    contacts: [...INITIAL_DB],
    filter: '',
    onlyBlockedRender: false,
  };

  formSubmitHandler = data => {
    data.id = shortId.generate();
    data.isBlocked = false;

    const savedContact = this.state.contacts.find(
      el => el.number === data.number,
    );
    if (savedContact) {
      alert(`This number is already saved under "${savedContact.name}" name`);
    }

    if (this.state.contacts.some(el => el.name === data.name)) {
      const newName = prompt(
        'This name is alreday used. Please, use different name',
      );
      data.name = newName;
    }

    this.setState(({ contacts }) => {
      return { contacts: [...contacts, data] };
    });
  };

  deleteContactHandler = id => {
    this.setState(({ contacts }) => {
      return { contacts: [...contacts].filter(el => el.id !== id) };
    });
  };

  blockContactHandler = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.map(el => {
          if (el.id === id) {
            el = {
              ...el,
              isBlocked: !el.isBlocked,
            };
          }
          return el;
        }),
      };
    });
  };

  filterSearchedContactsHandler = e => {
    this.setState({ filter: e.currentTarget.value, onlyBlockedRender: false });
  };

  filterBlockedContacts = e => {
    this.setState(({ onlyBlockedRender }) => {
      return { onlyBlockedRender: !onlyBlockedRender };
    });
  };

  onClearFilter = () => {
    this.setState({ filter: '' });
  };

  renderSearchedContacts = () => {
    const searchValue = this.state.filter.toLocaleLowerCase();
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(searchValue),
    );
  };

  getVisibleContacts = () => {
    if (this.state.filter) {
      return this.renderSearchedContacts();
    } else {
      return this.state.onlyBlockedRender
        ? this.state.contacts.filter(el => el.isBlocked)
        : this.state.contacts;
    }
  };

  render() {
    const contactList = this.getVisibleContacts();
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Section class="newContact" title="Create new contact">
            <ContactForm onSubmit={this.formSubmitHandler} />
          </Section>

          <Section class="contacts" title="Contacts">
            <Filter
              onSearch={this.filterSearchedContactsHandler}
              onClearFilter={this.onClearFilter}
              onBlockedFilter={this.filterBlockedContacts}
              renderBlocked={this.state.onlyBlockedRender}
              searchValue={this.state.filter}
              btnClass={this.state.filter ? 'filterBtnEmerged' : 'filterBtn'}
            />
            {contactList.length ? (
              <ContactsList
                contacts={contactList}
                onDelete={this.deleteContactHandler}
                onBlock={this.blockContactHandler}
              />
            ) : (
              <EmptyMessage message="Nothing found" />
            )}
          </Section>
        </div>
      </div>
    );
  }
}

export { App };
