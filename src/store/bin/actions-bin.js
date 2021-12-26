import { createAction } from '@reduxjs/toolkit';

export const moveToBin = createAction('bin/moveToBin');
export const deleteFromBin = createAction('bin/deleteFromBin');
export const deleteAllFromBin = createAction('bin/deleteAllFromBin');
