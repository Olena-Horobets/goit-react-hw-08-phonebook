import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { filterReducer } from './filter/reducer-filter';
import { contactsAPI } from 'store/contsctsAPI';

export const rootReducer = combineReducers({
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
