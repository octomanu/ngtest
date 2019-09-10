import { AppState } from 'redux/app.reducer';
import { createSelector } from '@ngrx/store';
import { GlobalState } from './globa.reducer';

export const selectGlobal = (state: AppState) => state.globalState;

export const smallViewport = createSelector(
  selectGlobal,
  (state: GlobalState) => state.smallViewport,
);

export const selectHelp = createSelector(
  selectGlobal,
  (state: GlobalState) => state.help,
);

export const selectKeepHelp = createSelector(
  selectGlobal,
  (state: GlobalState) => state.keepHelp,
);

export const selectHelpUrl = createSelector(
  selectGlobal,
  (state: GlobalState) => state.modalAyuda.url,
);
