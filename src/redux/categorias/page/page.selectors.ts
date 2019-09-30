import { createSelector } from '@ngrx/store';
import { selectCategoriasState } from '../categorias.selectors';

export const pageFilters = createSelector(
  selectCategoriasState,
  state => state.page.filters,
);

export const pageData = createSelector(
  selectCategoriasState,
  state => state.page.paginator.data,
);

export const paginatorParams = createSelector(
  selectCategoriasState,
  state => state.page.paginator.parametros,
);

export const paginatorTotal = createSelector(
  selectCategoriasState,
  state => state.page.paginator.recordsFiltered,
);

export const paginatorLoading = createSelector(
  selectCategoriasState,
  state => state.page.loading,
);

export const paginatorPage = createSelector(
  selectCategoriasState,
  state => state.page.paginator.parametros.page,
);

export const paginatorPageSize = createSelector(
  selectCategoriasState,
  state => state.page.paginator.parametros.page_size,
);

export const paginatorRequestParams = createSelector(
  selectCategoriasState,
  state => {
    return { ...state.page.paginator.parametros, ...state.filterForm.data };
  },
);
