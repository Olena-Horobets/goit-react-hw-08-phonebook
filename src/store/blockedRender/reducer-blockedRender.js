import { createReducer } from '@reduxjs/toolkit';
import {
  resetBlockedRender,
  toggleBlockedRender,
} from './action-blockedRender';

export const blockedRenderReducer = createReducer(false, {
  [resetBlockedRender.type]: (state, action) => false,
  [toggleBlockedRender.type]: (state, action) => !state,
});
