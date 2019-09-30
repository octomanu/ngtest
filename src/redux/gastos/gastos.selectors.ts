import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GastosState } from './gastos.reducer';

export const selectGastosState = createFeatureSelector<GastosState>('gastos');

export const openForm = createSelector(
  selectGastosState,
  state => {
    let whoIsOpen = null;
    if (state.createForm.open) whoIsOpen = 'create';
    else if (state.editForm.open) whoIsOpen = 'edit';
    return whoIsOpen;
  },
);
