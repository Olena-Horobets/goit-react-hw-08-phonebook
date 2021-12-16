import 'App.css';

import { useState, useEffect } from 'react';
import shortId from 'short-id';

import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'store/actions/actions-contacts';
import { setFilter, resetFilter } from 'store/actions/actions-filter';

import { useGetContactsQuery } from 'store/contsctsAPI';

import Section from 'components/Section/Section';
import { Header } from 'components/Header/Header';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { EmptyMessage } from 'components/EmptyMessage/EmptyMessage';

function App() {
  const filter = useSelector(state => state.filter);
  const { data: contacts } = useGetContactsQuery();
  console.log(contacts);
  const [onlyBlockedRender, setOnlyBlockedRender] = useState(false);

  const dispatch = useDispatch();

  const formSubmitHandler = contact => {
    contact.id = shortId.generate();
    contact.isBlocked = false;

    const savedContact = contacts?.find(el => el.number === contact.number);
    if (savedContact) {
      alert(`This number is already saved under "${savedContact.name}" name`);
    }

    if (contacts?.some(el => el.name === contact.name)) {
      const newName = prompt(
        'This name is alreday used. Please, use different name',
      );
      contact.name = newName;
    }

    dispatch(addContact({ contact }));
    setOnlyBlockedRender(false);
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
    return contacts?.filter(el => el.name.toLowerCase().includes(searchValue));
  };

  const getVisibleContacts = () => {
    if (filter?.length) {
      return renderSearchedContacts();
    } else {
      return onlyBlockedRender
        ? contacts?.filter(el => el.isBlocked)
        : contacts;
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
          {contactList?.length ? (
            <ContactsList contacts={contactList} />
          ) : (
            <EmptyMessage message="Nothing found" />
          )}
        </Section>
      </div>
    </div>
  );
}

export { App };
