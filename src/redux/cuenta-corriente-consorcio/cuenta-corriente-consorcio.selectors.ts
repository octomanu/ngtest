import { AppState } from 'redux/app.reducer';
import { createSelector } from '@ngrx/store';
import { CuentaCorrienteConsorcioState } from './cuenta-corriente-consorcio.reducer';

export const selectCuentaCorrienteConsorcio = (state: AppState) =>
  state.cuentaCorrienteConsorcio;

export const selectFiltros = createSelector(
  selectCuentaCorrienteConsorcio,
  (state: CuentaCorrienteConsorcioState) => state.filtros,
);

export const selectIdConsorcio = createSelector(
  selectCuentaCorrienteConsorcio,
  (state: CuentaCorrienteConsorcioState) => state.id_consorcio,
);
