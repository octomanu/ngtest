import { ActionReducerMap } from '@ngrx/store';
import * as fromPage from './page/page.reducer';
import * as fromEditForm from './edit-form/edit-form.reducer';
import * as fromCreateForm from './create-form/create-form.reducer';
import * as fromDelete from './delete/delete.reducer';
import * as fromFilterForm from './filter-form/filter-form.reducer';

export interface CabecerasState {
  page: fromPage.CabecerasPageState;
  editForm: fromEditForm.EditFormState;
  createForm: fromCreateForm.CreateFormState;
  filterForm: fromFilterForm.FilterFormState;
  delete: fromDelete.DeleteState;
}

export const cabeceraReducers: ActionReducerMap<CabecerasState> = {
  page: fromPage.pageReducer,
  editForm: fromEditForm.editFormReducer,
  createForm: fromCreateForm.createFormReducer,
  filterForm: fromFilterForm.filterFormReducer,
  delete: fromDelete.deleteReducer,
};
