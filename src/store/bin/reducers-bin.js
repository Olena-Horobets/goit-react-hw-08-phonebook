import { createReducer } from '@reduxjs/toolkit';
import { moveToBin, deleteFromBin, deleteAllFromBin } from './actions-bin';

const initialBin = [];

export const binReducer = createReducer(initialBin, {
  [moveToBin.type]: (state, action) => [...state, action.payload],
  [deleteFromBin.type]: (state, action) => [
    ...state.filter(el => el.id !== action.payload.id),
  ],
  [deleteAllFromBin.type]: (state, action) => initialBin,
});
