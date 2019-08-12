import { AppState } from 'redux/app.reducer';
import { createSelector } from '@ngrx/store';
import { CuentasBancariasState } from './cuentas-bancarias.reducer';

export const selectCuentaBancaria = (state: AppState) =>
  state.cuentasBancariasState;

export const selectFiltros = createSelector(
  selectCuentaBancaria,
  (state: CuentasBancariasState) => state.filtros,
);
