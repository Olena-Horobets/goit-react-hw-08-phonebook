import { createReducer } from '@reduxjs/toolkit';
import { setFilter, resetFilter } from '../actions/actions-filter';

const initialFilter = '';

export const filterReducer = createReducer(initialFilter, {
  [setFilter.type]: (state, action) => action.payload.value,
  [resetFilter.type]: (state, action) => initialFilter,
});
