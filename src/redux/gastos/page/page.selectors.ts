import { createSelector } from '@ngrx/store';
import { selectGastosState } from '../gastos.selectors';

export const pageFilters = createSelector(
  selectGastosState,
  state => state.page.filters,
);

export const pageData = createSelector(
  selectGastosState,
  state => state.page.paginator.data,
);

export const paginatorParams = createSelector(
  selectGastosState,
  state => state.page.paginator.parametros,
);

export const paginatorTotal = createSelector(
  selectGastosState,
  state => state.page.paginator.recordsFiltered,
);

export const paginatorLoading = createSelector(
  selectGastosState,
  state => state.page.loading,
);

export const paginatorPage = createSelector(
  selectGastosState,
  state => state.page.paginator.parametros.page,
);

export const paginatorPageSize = createSelector(
  selectGastosState,
  state => state.page.paginator.parametros.page_size,
);

export const paginatorRequestParams = createSelector(
  selectGastosState,
  state => {
    return { ...state.page.paginator.parametros, ...state.filterForm.data };
  },
);
