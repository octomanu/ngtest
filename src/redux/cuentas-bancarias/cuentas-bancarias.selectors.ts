import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CuentasBancariasState } from './cuentas-bancarias.reducer';

export const selectCuentaBancaria = createFeatureSelector<
  CuentasBancariasState
>('cuentasBancarias');

export const selectFiltros = createSelector(
  selectCuentaBancaria,
  (state: CuentasBancariasState) => state.filtros,
);
