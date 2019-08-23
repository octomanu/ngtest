import { AppState } from 'redux/app.reducer';
import { createSelector } from '@ngrx/store';
import { CajaConsorcioState } from './caja-consorcio.reducer';

export const selectCajaConsorcio = (state: AppState) =>
  state.cajaConsorcioState;

export const selectPaginator = createSelector(
  selectCajaConsorcio,
  (state: CajaConsorcioState) => state.paginator,
);
