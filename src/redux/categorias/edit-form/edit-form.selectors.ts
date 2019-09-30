import { createSelector } from '@ngrx/store';
import { selectCategoriasState } from '../categorias.selectors';

export const editFormData = createSelector(
  selectCategoriasState,
  state => state.editForm.data,
);

export const editId = createSelector(
  selectCategoriasState,
  state => state.editForm.id,
);
