import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GastosState } from '../gastos.reducer';

export const selectGastosState = createFeatureSelector<GastosState>('gastos');

export const filters = createSelector(
  selectGastosState,
  state => state.filterForm.data,
);
