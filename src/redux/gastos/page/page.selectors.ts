import { createSelector } from '@ngrx/store';
import { selectGastosState } from '../gastos.selectors';

export const pageFilters = createSelector(
  selectGastosState,
  state => state.page.filters,
);

export const selectPaginator = createSelector(
  selectGastosState,
  state => state.page.paginator,
);

export const pageData = createSelector(
  selectPaginator,
  paginator => paginator.data,
);

export const paginatorParams = createSelector(
  selectPaginator,
  paginator => paginator.parametros,
);

export const paginatorTotal = createSelector(
  selectPaginator,
  paginator => paginator.recordsFiltered,
);

export const paginatorLoading = createSelector(
  selectGastosState,
  state => state.page.loading,
);

export const paginatorPage = createSelector(
  selectPaginator,
  paginator => paginator.parametros.page,
);

export const paginatorPageSize = createSelector(
  selectPaginator,
  paginator => paginator.parametros.page_size,
);

export const paginatorRequestParams = createSelector(
  selectGastosState,
  state => {
    return { ...state.page.paginator.parametros, ...state.filterForm.data };
  },
);

export const showColumns = createSelector(
  selectGastosState,
  state => state.page.showColumns,
);

export const consorcioVisible = createSelector(
  showColumns,
  columns => columns.consorcio,
);

export const proveedorVisible = createSelector(
  showColumns,
  columns => columns.proveedor,
);

export const servicioVisible = createSelector(
  showColumns,
  columns => columns.servicio,
);
