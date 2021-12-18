import { createAction } from '@reduxjs/toolkit';

export const resetBlockedRender = createAction(
  'blockedRender/resetBlockedRender',
);
export const toggleBlockedRender = createAction(
  'blockedRender/toggleBlockedRender',
);
