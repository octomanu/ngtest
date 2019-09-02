import { AppState } from 'redux/app.reducer';
import { createSelector } from '@ngrx/store';
import { SueldosState } from './sueldos.reducer';

export const selectSueldos = (state: AppState) => state.sueldosState;

export const selectFiltros = createSelector(
  selectSueldos,
  (state: SueldosState) => state.filtros,
);

export const selectIdEmpleado = createSelector(
  selectSueldos,
  (state: SueldosState) => state.id_empleado,
);
