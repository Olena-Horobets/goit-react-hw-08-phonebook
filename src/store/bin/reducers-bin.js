import { createReducer } from '@reduxjs/toolkit';
import {
  moveToBin,
  restoreFromBin,
  deleteFromBin,
  deleteAllFromBin,
} from './actions-bin';

const initialBin = [];

export const binReducer = createReducer(initialBin, {
  [moveToBin.type]: (state, action) => [...state, action.payload],
  // [restoreFromBin.type]: (state, action) => action.payload.value,
  // [deleteFromBin.type]: (state, action) => action.payload.value,
  // [deleteAllFromBin.type]: (state, action) => action.payload.value,
});
