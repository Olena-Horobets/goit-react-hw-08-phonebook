import 'App.css';

import { useState, useEffect } from 'react';
import shortId from 'short-id';

import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  deleteContact,
  toggleContactBlock,
} from 'store/actions/actions-contacts';
import { setFilter, resetFilter } from 'store/actions/actions-filter';
import { CONTACTS } from 'utils/constants';

import Section from 'components/Section/Section';
import { Header } from 'components/Header/Header';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { EmptyMessage } from 'components/EmptyMessage/EmptyMessage';

function App() {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const [onlyBlockedRender, setOnlyBlockedRender] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = contact => {
    contact.id = shortId.generate();
    contact.isBlocked = false;

    const savedContact = contacts.find(el => el.number === contact.number);
    if (savedContact) {
      alert(`This number is already saved under "${savedContact.name}" name`);
    }

    if (contacts.some(el => el.name === contact.name)) {
      const newName = prompt(
        'This name is alreday used. Please, use different name',
      );
      contact.name = newName;
    }

    dispatch(addContact({ contact }));
    setOnlyBlockedRender(false);
  };

  const deleteContactHandler = id => {
    dispatch(deleteContact({ id }));
  };

  const blockContactHandler = id => {
    dispatch(toggleContactBlock({ id }));
  };

  const filterSearchedContactsHandler = e => {
    dispatch(setFilter({ value: e.currentTarget.value }));
    setOnlyBlockedRender(false);
  };

  const filterBlockedContacts = e => {
    setOnlyBlockedRender(prev => !prev);
  };

  const renderSearchedContacts = () => {
    const searchValue = filter.toLocaleLowerCase();
    return contacts.filter(el => el.name.toLowerCase().includes(searchValue));
  };

  const getVisibleContacts = () => {
    if (filter.length) {
      return renderSearchedContacts();
    } else {
      return onlyBlockedRender ? contacts.filter(el => el.isBlocked) : contacts;
    }
  };

  const contactList = getVisibleContacts();
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Section
          styledClass="newContact"
          title="Create new contact"
          iconName={'icon-add_ic_call'}
        >
          <ContactForm onSubmit={formSubmitHandler} />
        </Section>

        <Section
          styledClass="contacts"
          title="Contacts"
          iconName={'icon-contacts'}
        >
          <Filter
            onSearch={filterSearchedContactsHandler}
            onClearFilter={() => dispatch(resetFilter())}
            onBlockedFilter={filterBlockedContacts}
            renderBlocked={onlyBlockedRender}
            searchValue={filter}
            btnClass={filter ? 'filterBtnEmerged' : 'filterBtn'}
          />
          {contactList.length ? (
            <ContactsList
              contacts={contactList}
              onDelete={deleteContactHandler}
              onBlock={blockContactHandler}
            />
          ) : (
            <EmptyMessage message="Nothing found" />
          )}
        </Section>
      </div>
    </div>
  );
}

export { App };
