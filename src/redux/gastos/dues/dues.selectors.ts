import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GastosState } from '../gastos.reducer';

export const selectGastos = createFeatureSelector<GastosState>('gastos');
export const haveDues = createSelector(
  selectGastos,
  (state: GastosState) =>
    Object.keys(state.dues.duesToUpdate).length > 0 ? true : false,
);

export const loading = createSelector(
  selectGastos,
  (state: GastosState) => state.dues.loading,
);
