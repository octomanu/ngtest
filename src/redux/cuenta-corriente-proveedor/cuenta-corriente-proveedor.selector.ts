import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CuentaCorrienteProveedorState } from './cuenta-corriente-proveedor.reducer';

export const selectCuentaCorrienteProveedor = createFeatureSelector<
  CuentaCorrienteProveedorState
>('cuentaCorrienteProveedor');

export const selectFiltros = createSelector(
  selectCuentaCorrienteProveedor,
  (state: CuentaCorrienteProveedorState) => state.filtros,
);

export const selectIdProveedor = createSelector(
  selectCuentaCorrienteProveedor,
  (state: CuentaCorrienteProveedorState) => state.id_proveedor,
);
