import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CabecerasState } from '../cabeceras.reducer';

export const selectCabecerasState = createFeatureSelector<CabecerasState>(
  'cabeceras',
);

export const filters = createSelector(
  selectCabecerasState,
  state => state.filterForm.data,
);
