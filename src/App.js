import 'App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setFilter, resetFilter } from 'store/filter/action-filter';
import { useAddContactMutation } from 'store/contsctsAPI';
import { GetVisibleContacts } from 'services/getVisibleContacts';

import { Section } from 'components/Section/Section';
import { Header } from 'components/Header/Header';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { EmptyMessage } from 'components/EmptyMessage/EmptyMessage';
import { Loader } from 'components/Loader/Loader';

function App() {
  const [addContact] = useAddContactMutation();
  const [onlyBlockedRender, setOnlyBlockedRender] = useState(false);
  const { contacts, isLoading } = GetVisibleContacts({ onlyBlockedRender });

  const dispatch = useDispatch();

  const formSubmitHandler = contact => {
    const savedContact = contacts?.find(el => el.number === contact.number);

    if (savedContact) {
      toast.error(
        `This number is already saved under "${savedContact.name.toUpperCase()}" name`,
      );
      return;
    }

    if (contacts?.some(el => el.name === contact.name)) {
      const newName = prompt(
        'This name is alreday used. Please, use different name',
      );
      contact.name = newName;
    }

    addContact({ contact });
    setOnlyBlockedRender(false);
    toast.success(
      `Contact "${contact.name.toUpperCase()}" added to your list successfully!`,
    );
  };

  const filterSearchedContactsHandler = e => {
    dispatch(setFilter({ value: e.currentTarget.value }));
    setOnlyBlockedRender(false);
  };

  return (
    <div className="App">
      <ToastContainer theme="light" icon={true} limit={1} />
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
            onBlockedFilter={() => setOnlyBlockedRender(prev => !prev)}
            renderBlocked={onlyBlockedRender}
          />
          {contacts?.length ? (
            <ContactsList contacts={contacts} />
          ) : isLoading ? (
            <Loader size={60} color={'rgba(252, 0, 0, 0.3)'} />
          ) : (
            <EmptyMessage message="Nothing found" />
          )}
        </Section>
      </div>
    </div>
  );
}

export { App };
