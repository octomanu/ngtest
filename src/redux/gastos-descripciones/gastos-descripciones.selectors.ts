import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GastosDescripcionesState } from './gastos-descripciones.reducer';

export const selectGastosDescripciones = createFeatureSelector<
  GastosDescripcionesState
>('gastosDescripciones');

export const selectPaginatorParams = createSelector(
  selectGastosDescripciones,
  (state: GastosDescripcionesState) => state.paginator.parametros,
);

export const selectFiltros = createSelector(
  selectGastosDescripciones,
  (state: GastosDescripcionesState) => state.filtros,
);

export const paginatorRequestParams = createSelector(
  selectPaginatorParams,
  selectFiltros,
  (params, filters) => {
    return { ...params, ...filters };
  },
);
