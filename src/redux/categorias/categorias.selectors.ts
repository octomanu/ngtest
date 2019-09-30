import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CategoriasState } from './categorias.reducer';

export const selectCategoriasState = createFeatureSelector<CategoriasState>(
  'categorias',
);

export const formLoading = createSelector(
  selectCategoriasState,
  state => state.editForm.loading || state.createForm.loading,
);
