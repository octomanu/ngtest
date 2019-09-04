import { Action } from '@ngrx/store';

export enum CabecerasPageActionsTypes {
  CabecerasChangePage = '[Cabeceras] Change Page',
  CabecerasPageRequest = '[Cabeceras] Page Request',
  CabecerasPageRequestSuccess = '[Cabeceras] Page Request Success',
  CabecerasPageRequestFail = '[Cabeceras] Page Request Fail',
  ChangePageFilters = '[Cabeceras] Change Page Filters',
  ChangePageOrder = '[Cabeceras] Change Page Order',
}

export class CabecerasChangePage implements Action {
  readonly type = CabecerasPageActionsTypes.CabecerasChangePage;
  constructor(public payload: { page: number }) {}
}
export class CabecerasPageRequest implements Action {
  readonly type = CabecerasPageActionsTypes.CabecerasPageRequest;
}
export class CabecerasPageRequestSuccess implements Action {
  readonly type = CabecerasPageActionsTypes.CabecerasPageRequestSuccess;
  constructor(public payload: { data: any[]; recordsFiltered: number }) {}
}
export class CabecerasPageRequestFail implements Action {
  readonly type = CabecerasPageActionsTypes.CabecerasPageRequestFail;
  constructor(public payload: { error: any }) {}
}

export class ChangePageFilters implements Action {
  readonly type = CabecerasPageActionsTypes.ChangePageFilters;
}
export class ChangePageOrder implements Action {
  readonly type = CabecerasPageActionsTypes.ChangePageOrder;
  constructor(public payload: { field: string; order: string }) {}
}

export type CabecerasPageActions =
  | CabecerasChangePage
  | CabecerasPageRequest
  | CabecerasPageRequestSuccess
  | CabecerasPageRequestFail
  | ChangePageFilters
  | ChangePageOrder;
