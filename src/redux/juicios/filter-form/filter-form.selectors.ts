import { createSelector } from '@ngrx/store';
import { selectJuiciosState } from '../juicios.selectors';

export const filters = createSelector(
  selectJuiciosState,
  state => state.filterForm.data,
);
