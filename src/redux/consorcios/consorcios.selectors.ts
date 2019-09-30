import { createFeatureSelector } from '@ngrx/store';
import { ConsorciosState } from './consorcios.reducer';

export const selectConsorciosState = createFeatureSelector<ConsorciosState>(
  'consorcios',
);
