import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  REGISTER,
  PAUSE,
  PERSIST,
  PURGE,
} from 'redux-persist';
import logger from 'redux-logger';

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { filterReducer } from './filter/reducer-filter';
import { emptySplitApi } from 'store/mainAPISlice';
import { authReducer } from 'store/auth/auth-slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  filter: filterReducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE],
      },
    }),
    emptySplitApi.middleware,
    logger,
  ],
});

export const persistor = persistStore(store);
