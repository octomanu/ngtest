import { createSelector } from '@ngrx/store';
import { selectCategoriasState } from '../categorias.selectors';

export const filters = createSelector(
  selectCategoriasState,
  state => state.filterForm.data,
);
