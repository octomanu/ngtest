import { createSelector } from '@ngrx/store';
import { selectCabecerasState } from '../cabeceras.selectors';

export const editFormData = createSelector(
  selectCabecerasState,
  state => state.editForm.data,
);

export const editId = createSelector(
  selectCabecerasState,
  state => state.editForm.id,
);
