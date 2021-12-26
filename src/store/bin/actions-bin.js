import { createAction } from '@reduxjs/toolkit';

export const moveToBin = createAction('bin/moveToBin');
export const restoreFromBin = createAction('bin/restoreFromBin');
export const deleteFromBin = createAction('bin/deleteFromBin');
export const deleteAllFromBin = createAction('bin/deleteAllFromBin');
