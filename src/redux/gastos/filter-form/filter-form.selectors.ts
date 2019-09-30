import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GastosState } from '../gastos.reducer';

export const selectGastosState = createFeatureSelector<GastosState>('gastos');

export const filterForm = createSelector(
  selectGastosState,
  state => state.filterForm,
);

export const filters = createSelector(
  filterForm,
  state => state.data,
);

export const proveedorVisible = createSelector(
  filters,
  state => (state['gastos-id_proveedor'] ? false : true),
);

export const consorcioVisible = createSelector(
  filters,
  state => (state['gastos-id_consorcio'] ? false : true),
);

export const servicioVisible = createSelector(
  filters,
  state => (state['gastos-id_servicio'] ? false : true),
);
