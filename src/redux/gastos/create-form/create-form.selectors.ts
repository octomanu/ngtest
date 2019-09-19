import { createSelector } from '@ngrx/store';
import { selectGastosState } from '../gastos.selectors';

export const createFormState = createSelector(
  selectGastosState,
  state => state.createForm,
);

export const createFormData = createSelector(
  createFormState,
  state => state.data,
);

export const createFormError = createSelector(
  createFormState,
  state => state.error,
);

export const createFormLoading = createSelector(
  createFormState,
  state => state.loading,
);
