import { AppState } from 'redux/app.reducer';
import { createSelector } from '@ngrx/store';
import { CuentaCorrienteProveedorState } from './cuenta-corriente-proveedor.reducer';

export const selectCuentaCorrienteProveedor = (state: AppState) =>
  state.cuentaCorrienteProveedor;

export const selectFiltros = createSelector(
  selectCuentaCorrienteProveedor,
  (state: CuentaCorrienteProveedorState) => state.filtros,
);
