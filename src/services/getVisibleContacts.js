import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'store/contacts/contsctsAPI';

function GetVisibleContacts() {
  const filter = useSelector(state => state.filter);
  const { data: contacts, isFetching } = useGetContactsQuery();

  const renderSearchedContacts = () => {
    const searchValue = filter.toLocaleLowerCase();
    return contacts?.filter(el => el.name.toLowerCase().includes(searchValue));
  };

  const getVisibleContacts = () => {
    if (filter?.length) {
      return renderSearchedContacts();
    } else {
      return contacts;
    }
  };

  return { contacts: getVisibleContacts(), isLoading: isFetching };
}

export { GetVisibleContacts };
