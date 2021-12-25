import { Routes, Route } from 'react-router-dom';

import { useAddContactMutation } from 'store/contacts/contsctsAPI';
import { GetVisibleContacts } from 'services/getVisibleContacts';

import { Navigation } from 'components/Navigation/Navigation';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { BinContactsList } from 'components/BinContactsList/BinContactsList';
import { Section } from 'components/Section/Section';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { EmptyMessage } from 'components/EmptyMessage/EmptyMessage';
import { Loader } from 'components/Loader/Loader';

function ContactsView({ toast }) {
  const [addContact] = useAddContactMutation();
  const { contacts, isLoading } = GetVisibleContacts();

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

    toast.success(
      `Contact "${contact.name.toUpperCase()}" added to your list successfully!`,
    );
  };

  return (
    <>
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <Section
              styledClass="newContact"
              title="Create new contact"
              iconName={'icon-add_ic_call'}
            >
              <ContactForm onSubmit={formSubmitHandler} />
            </Section>
          }
          exact
        />
        <Route
          path="/deleted"
          element={
            <Section
              styledClass="deleted"
              title="Deleted contacts"
              iconName={'icon-delete_sweep'}
            >
              <BinContactsList toast={toast} />
            </Section>
          }
          exact
        />
      </Routes>

      <Section
        styledClass="contacts"
        title="Contacts"
        iconName={'icon-contacts'}
      >
        <Filter />
        {contacts?.length ? (
          <ContactsList contacts={contacts} />
        ) : isLoading ? (
          <Loader size={60} color={'rgba(252, 0, 0, 0.3)'} />
        ) : (
          <EmptyMessage message="Nothing found" />
        )}
      </Section>
    </>
  );
}

export { ContactsView };
