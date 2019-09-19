import { createFeatureSelector } from '@ngrx/store';
import { GastosState } from './gastos.reducer';

export const selectGastosState = createFeatureSelector<GastosState>('gastos');
