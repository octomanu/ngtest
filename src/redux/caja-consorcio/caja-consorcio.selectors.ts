import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CajaConsorcioState } from './caja-consorcio.reducer';

export const selectCajaConsorcio = createFeatureSelector<CajaConsorcioState>(
  'cajaConsorcio',
);

export const selectPaginator = createSelector(
  selectCajaConsorcio,
  (state: CajaConsorcioState) => state.paginator,
);
