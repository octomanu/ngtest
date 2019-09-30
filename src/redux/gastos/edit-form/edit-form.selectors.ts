import { createSelector } from '@ngrx/store';
import { selectGastosState } from '../gastos.selectors';

export const editFormData = createSelector(
  selectGastosState,
  state => state.editForm.data,
);

export const editId = createSelector(
  selectGastosState,
  state => state.editForm.id,
);
