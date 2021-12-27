import { Outlet } from 'react-router-dom';

import { GetVisibleContacts } from 'services/getVisibleContacts';

import { Navigation } from 'components/Navigation/Navigation';
import Section from 'components/Section/Section';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { EmptyMessage } from 'components/EmptyMessage/EmptyMessage';
import { Loader } from 'components/Loader/Loader';

function ContactsView() {
  const { contacts, isLoading } = GetVisibleContacts();

  return (
    <>
      <Navigation />

      <Outlet />
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

export default ContactsView;
