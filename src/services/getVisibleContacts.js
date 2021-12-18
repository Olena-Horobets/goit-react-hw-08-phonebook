import { useSelector } from 'react-redux';

import { useGetContactsQuery } from 'store/contsctsAPI';

function GetVisibleContacts({ renderBlocked }) {
  const { data: contacts, isFetching } = useGetContactsQuery();

  const filter = useSelector(state => state.filter);

  const renderSearchedContacts = () => {
    const searchValue = filter.toLocaleLowerCase();
    return contacts?.filter(el => el.name.toLowerCase().includes(searchValue));
  };

  const getVisibleContacts = () => {
    if (filter?.length) {
      return renderSearchedContacts();
    } else {
      return renderBlocked ? contacts?.filter(el => el.isBlocked) : contacts;
    }
  };

  return { contacts: getVisibleContacts(), isLoading: isFetching };
}

export { GetVisibleContacts };
