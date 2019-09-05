import * as fromPage from './page/page.reducer';
import * as fromEditForm from './edit-form/edit-form.reducer';
import * as fromCreateForm from './create-form/create-form.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface CabecerasState {
  page: fromPage.CabecerasPageState;
  editForm: fromEditForm.EditFormState;
  createForm: fromCreateForm.CreateFormState;
}

export const cabeceraReducers: ActionReducerMap<CabecerasState> = {
  page: fromPage.pageReducer,
  editForm: fromEditForm.editFormReducer,
  createForm: fromCreateForm.createFormReducer,
};
