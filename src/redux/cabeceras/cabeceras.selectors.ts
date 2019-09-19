import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CabecerasState } from './cabeceras.reducer';

export const selectCabecerasState = createFeatureSelector<CabecerasState>(
  'cabeceras',
);

export const formLoading = createSelector(
  selectCabecerasState,
  state => state.editForm.loading || state.createForm.loading,
);
