import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CuentaCorrienteConsorcioState } from './cuenta-corriente-consorcio.reducer';

export const selectCuentaCorrienteConsorcio = createFeatureSelector<
  CuentaCorrienteConsorcioState
>('cuentaCorrienteConsorcio');

export const selectFiltros = createSelector(
  selectCuentaCorrienteConsorcio,
  (state: CuentaCorrienteConsorcioState) => state.filtros,
);

export const selectIdConsorcio = createSelector(
  selectCuentaCorrienteConsorcio,
  (state: CuentaCorrienteConsorcioState) => state.id_consorcio,
);
