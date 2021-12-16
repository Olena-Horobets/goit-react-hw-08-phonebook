import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { contactsReducer } from './reducers/reducers-contacts';
import { filterReducer } from './reducers/reducers-filter';
import { contactsAPI } from 'store/contsctsAPI';

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  [contactsAPI.reducerPath]: contactsAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsAPI.middleware,
  ],
});
