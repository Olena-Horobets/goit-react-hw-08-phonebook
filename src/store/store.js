import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { contactsReducer } from './reducers/reducers-contacts';
import { filterReducer } from './reducers/reducers-filter';

export const reducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer,
});
