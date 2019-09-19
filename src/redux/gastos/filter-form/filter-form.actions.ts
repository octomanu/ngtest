import { Action } from '@ngrx/store';

export enum FilterActionsTypes {
  OpenFilterForm = '[Gastos] Open Filter Form',
  CloseFilterForm = '[Gastos] Close Filter Form',
  FilterRequest = '[Gastos] Filter Request',
}

export class OpenFilterForm implements Action {
  readonly type = FilterActionsTypes.OpenFilterForm;
}
export class CloseFilterForm implements Action {
  readonly type = FilterActionsTypes.CloseFilterForm;
}
export class FilterRequest implements Action {
  readonly type = FilterActionsTypes.FilterRequest;
  constructor(public payload: { data: any }) {}
}

export type FilterActions = OpenFilterForm | CloseFilterForm | FilterRequest;
