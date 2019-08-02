import { AppState } from 'redux/app.reducer';
import { createSelector } from '@ngrx/store';
import { ServiciosState } from './servicios.reducer';

export const selectServicios = (state: AppState) => state.serviciosState;

export const selectFiltros = createSelector(
  selectServicios,
  (state: ServiciosState) => state.filtros,
);
