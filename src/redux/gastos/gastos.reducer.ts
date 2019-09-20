import * as fromPage from './page/page.reducer';
import * as fromDue from './dues/dues.reducer';
import * as fromFilter from './filter-form/filter-form.reducer';
import * as fromCreateForm from './create-form/create-form.reducer';
import * as fromDelete from './delete/delete.reducer';
import * as fromPayment from './payment-form/payment-form.reducer';
import * as fromEditForm from './edit-form/edit-form.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface GastosState {
  page: fromPage.GastosPageState;
  dues: fromDue.DuesState;
  filterForm: fromFilter.FilterFormState;
  createForm: fromCreateForm.CreateFormState;
  paymentForm: fromPayment.PaymentFormState;
  editForm: fromEditForm.EditFormState;
  delete: fromDelete.DeleteState;
}

export const gastosReducers: ActionReducerMap<GastosState> = {
  page: fromPage.pageReducer,
  dues: fromDue.DuesReducer,
  filterForm: fromFilter.filterFormReducer,
  createForm: fromCreateForm.createFormReducer,
  paymentForm: fromPayment.paymentFormReducer,
  editForm: fromEditForm.editFormReducer,
  delete: fromDelete.deleteReducer,
};
