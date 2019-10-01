import { createSelector, createFeatureSelector } from '@ngrx/store';
import { JuiciosState } from './juicios.reducer';

export const selectJuiciosState = createFeatureSelector<JuiciosState>(
  'juicios',
);

export const formLoading = createSelector(
  selectJuiciosState,
  state => state.editForm.loading || state.createForm.loading,
);
