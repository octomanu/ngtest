import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CabecerasState } from './cabeceras.reducer';

export const selectCabecerasState = createFeatureSelector<CabecerasState>(
  'cabeceras',
);

export const formLoading = createSelector(
  selectCabecerasState,
  state => state.editForm.loading || state.createForm.loading,
);

export const paginatorRequestParams = createSelector(
  selectCabecerasState,
  state => {
    return { ...state.page.paginator.parametros, ...state.filterForm.data };
  },
);
