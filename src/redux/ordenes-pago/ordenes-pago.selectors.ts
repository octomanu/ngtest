import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrdenesPagoState } from './ordenes-pago.reducer';

export const selectOrdenesPago = createFeatureSelector<OrdenesPagoState>(
  'ordenesPago',
);

export const selectFiltros = createSelector(
  selectOrdenesPago,
  (state: OrdenesPagoState) => state.filtros,
);

export const selectPaginatorParams = createSelector(
  selectOrdenesPago,
  (state: OrdenesPagoState) => state.paginator.parametros,
);

export const selectPaginatorVars = createSelector(
  selectOrdenesPago,
  (state: OrdenesPagoState) => ({
    filters: state.filtros,
    parameters: state.paginator.parametros,
  }),
);
