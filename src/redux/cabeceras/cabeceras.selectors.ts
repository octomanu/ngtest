import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CabecerasState } from './cabeceras.reducer';

export const selectCabecerasState = createFeatureSelector<CabecerasState>(
  'cabeceras',
);

export const pageFilters = createSelector(
  selectCabecerasState,
  state => state.page.filters,
);

export const pageData = createSelector(
  selectCabecerasState,
  state => state.page.paginator.data,
);

export const paginatorParams = createSelector(
  selectCabecerasState,
  state => state.page.paginator.parametros,
);

export const paginatorTotal = createSelector(
  selectCabecerasState,
  state => state.page.paginator.recordsFiltered,
);

export const paginatorLoading = createSelector(
  selectCabecerasState,
  state => state.page.loading,
);

export const paginatorPage = createSelector(
  selectCabecerasState,
  state => state.page.paginator.parametros.page,
);

export const paginatorPageSize = createSelector(
  selectCabecerasState,
  state => state.page.paginator.parametros.page_size,
);

export const editId = createSelector(
  selectCabecerasState,
  state => state.editForm.id,
);

export const formLoading = createSelector(
  selectCabecerasState,
  state => state.editForm.loading || state.createForm.loading,
);

export const editFormData = createSelector(
  selectCabecerasState,
  state => state.editForm.data,
);
