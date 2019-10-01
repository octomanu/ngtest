import { createSelector } from '@ngrx/store';
import { selectJuiciosState } from '../juicios.selectors';

export const editFormData = createSelector(
  selectJuiciosState,
  state => state.editForm.data,
);

export const editId = createSelector(
  selectJuiciosState,
  state => state.editForm.id,
);
