import { AppState } from 'redux/app.reducer';
import { createSelector } from '@ngrx/store';
import { GlobalState } from './globa.reducer';

export const selectGlobal = (state: AppState) => state.globalState;

export const smallViewport = createSelector(
  selectGlobal,
  (state: GlobalState) => state.smallViewport,
);
