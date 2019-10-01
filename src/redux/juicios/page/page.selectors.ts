import { createSelector } from '@ngrx/store';
import { selectJuiciosState } from '../juicios.selectors';

export const pageFilters = createSelector(
  selectJuiciosState,
  state => state.page.filters,
);

export const pageData = createSelector(
  selectJuiciosState,
  state => state.page.paginator.data,
);

export const paginatorParams = createSelector(
  selectJuiciosState,
  state => state.page.paginator.parametros,
);

export const paginatorTotal = createSelector(
  selectJuiciosState,
  state => state.page.paginator.recordsFiltered,
);

export const paginatorLoading = createSelector(
  selectJuiciosState,
  state => state.page.loading,
);

export const paginatorPage = createSelector(
  selectJuiciosState,
  state => state.page.paginator.parametros.page,
);

export const paginatorPageSize = createSelector(
  selectJuiciosState,
  state => state.page.paginator.parametros.page_size,
);

export const paginatorRequestParams = createSelector(
  selectJuiciosState,
  state => {
    return { ...state.page.paginator.parametros, ...state.filterForm.data };
  },
);
