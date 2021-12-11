import { createReducer } from '@reduxjs/toolkit';

import { CONTACTS } from 'utils/constants';
import {
  addContact,
  deleteContact,
  toggleContactBlock,
} from '../actions/actions-contacts';

const initialContacts = () => {
  return localStorage.getItem(CONTACTS)
    ? JSON.parse(localStorage.getItem(CONTACTS))
    : [];
};

export const contactsReducer = createReducer(initialContacts(), {
  [addContact.type]: (state, action) => [...state, action.payload.contact],
  [deleteContact.type]: (state, action) =>
    state.filter(el => el.id !== action.payload.id),
  [toggleContactBlock.type]: (state, action) =>
    state.map(el => {
      if (el.id === action.payload.id) {
        el = {
          ...el,
          isBlocked: !el.isBlocked,
        };
      }
      return el;
    }),
});
