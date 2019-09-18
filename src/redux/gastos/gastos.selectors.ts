import { AppState } from 'redux/app.reducer';
import { createSelector } from '@ngrx/store';
import { GastosState } from './gastos.reducer';

export const selectGastos = (state: AppState) => state.gastosState;

export const haveDues = createSelector(
  selectGastos,
  (state: GastosState) =>
    Object.keys(state.duesToUpdate).length > 0 ? true : false,
);

export const loading = createSelector(
  selectGastos,
  (state: GastosState) => state.loading,
);
