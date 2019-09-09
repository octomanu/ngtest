import { AppState } from 'redux/app.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SueldosState } from './sueldos.reducer';

export const selectSueldos = createFeatureSelector<SueldosState>('sueldos');

export const selectFiltros = createSelector(
  selectSueldos,
  (state: SueldosState) => state.filtros,
);

export const selectIdEmpleado = createSelector(
  selectSueldos,
  (state: SueldosState) => state.id_empleado,
);
