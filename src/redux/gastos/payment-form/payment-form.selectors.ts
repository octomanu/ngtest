import { createSelector } from '@ngrx/store';
import { selectGastosState } from '../gastos.selectors';

export const paymentFormData = createSelector(
  selectGastosState,
  state => state.paymentForm.data,
);

export const paymentId = createSelector(
  selectGastosState,
  state => state.paymentForm.id,
);

export const amount = createSelector(
  selectGastosState,
  state => state.paymentForm.amount,
);
