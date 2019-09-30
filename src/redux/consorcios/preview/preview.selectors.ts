import { createSelector } from '@ngrx/store';
import { selectConsorciosState } from '../consorcios.selectors';

export const preview = createSelector(
  selectConsorciosState,
  state => state.preview,
);

export const html = createSelector(
  preview,
  state => state.html,
);
