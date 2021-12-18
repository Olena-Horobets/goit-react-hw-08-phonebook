import { useSelector } from 'react-redux';

import { useGetContactsQuery } from 'store/contacts/contsctsAPI';

function GetVisibleContacts() {
  const { data: contacts, isFetching } = useGetContactsQuery();

  const filter = useSelector(state => state.filter);
  const blockedRender = useSelector(state => state.blockedRender);

  const renderSearchedContacts = () => {
    const searchValue = filter.toLocaleLowerCase();
    return contacts?.filter(el => el.name.toLowerCase().includes(searchValue));
  };

  const getVisibleContacts = () => {
    if (filter?.length) {
      return renderSearchedContacts();
    } else {
      return blockedRender ? contacts?.filter(el => el.isBlocked) : contacts;
    }
  };

  return { contacts: getVisibleContacts(), isLoading: isFetching };
}

export { GetVisibleContacts };
