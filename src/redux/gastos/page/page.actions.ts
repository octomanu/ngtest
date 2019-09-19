import { Action } from '@ngrx/store';

export enum GastosPageActionsTypes {
  GastosChangePage = '[Gastos] Change Page',
  GastosPageRequest = '[Gastos] Page Request',
  GastosPageRequestSuccess = '[Gastos] Page Request Success',
  GastosPageRequestFail = '[Gastos] Page Request Fail',
  ChangePageFilters = '[Gastos] Change Page Filters',
  ChangePageOrder = '[Gastos] Change Page Order',
}

export class GastosChangePage implements Action {
  readonly type = GastosPageActionsTypes.GastosChangePage;
  constructor(public payload: { page: number }) {}
}
export class GastosPageRequest implements Action {
  readonly type = GastosPageActionsTypes.GastosPageRequest;
}
export class GastosPageRequestSuccess implements Action {
  readonly type = GastosPageActionsTypes.GastosPageRequestSuccess;
  constructor(public payload: { data: any[]; recordsFiltered: number }) {}
}
export class GastosPageRequestFail implements Action {
  readonly type = GastosPageActionsTypes.GastosPageRequestFail;
  constructor(public payload: { error: any }) {}
}

export class ChangePageOrder implements Action {
  readonly type = GastosPageActionsTypes.ChangePageOrder;
  constructor(public payload: { field: string; order: string }) {}
}

export type GastosPageActions =
  | GastosChangePage
  | GastosPageRequest
  | GastosPageRequestSuccess
  | GastosPageRequestFail
  | ChangePageOrder;
