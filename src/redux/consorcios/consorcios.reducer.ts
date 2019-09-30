import * as fromPreview from './preview/preview.reducer';
import { ActionReducerMap } from '@ngrx/store';
export interface ConsorciosState {
  preview: fromPreview.PreviewState;
}

export const consorciosReducers: ActionReducerMap<ConsorciosState> = {
  preview: fromPreview.reducer,
};
