import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact } from '../actions/actions-contacts';

const CONTACTS = 'contacts';

const initialContacts = () => {
  return localStorage.getItem(CONTACTS)
    ? JSON.parse(localStorage.getItem(CONTACTS))
    : [];
};

export const contactsReducer = createReducer(initialContacts(), {
  [addContact.type]: (state, action) => [...state, action.payload.contact],
  [deleteContact.type]: (state, action) =>
    state.filter(el => el.id !== action.payload.id),
});
