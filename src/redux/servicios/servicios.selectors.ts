import { AppState } from 'redux/app.reducer';
import { createSelector } from '@ngrx/store';
import { ServiciosState } from './servicios.reducer';

export const selectServicios = (state: AppState) => state.serviciosState;

export const selectFiltros = createSelector(
  selectServicios,
  (state: ServiciosState) => state.filtros,
);

export const selectInitialized = createSelector(
  selectServicios,
  (state: ServiciosState) => state.initialized,
);

export const selectPaginatorData = createSelector(
  selectServicios,
  (state: ServiciosState) => state.paginator.data,
);

export const selectPaginatorParams = createSelector(
  selectServicios,
  (state: ServiciosState) => state.paginator.parametros,
);

export const selectPaginatorTotal = createSelector(
  selectServicios,
  (state: ServiciosState) => state.paginator.recordsFiltered,
);

export const selectLoading = createSelector(
  selectServicios,
  (state: ServiciosState) => state.loading,
);

export const selectPaginatorPage = createSelector(
  selectPaginatorParams,
  paginatorParams => paginatorParams.page,
);

export const selectPaginatorPageSize = createSelector(
  selectPaginatorParams,
  paginatorParams => paginatorParams.page_size,
);
