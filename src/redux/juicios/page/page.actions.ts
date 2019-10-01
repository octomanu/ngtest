import { Action } from '@ngrx/store';

export enum JuiciosPageActionsTypes {
  JuiciosChangePage = '[Juicios] Change Page',
  JuiciosPageRequest = '[Juicios] Page Request',
  JuiciosPageRequestSuccess = '[Juicios] Page Request Success',
  JuiciosPageRequestFail = '[Juicios] Page Request Fail',
  ChangePageFilters = '[Juicios] Change Page Filters',
  ChangePageOrder = '[Juicios] Change Page Order',
}

export class JuiciosChangePage implements Action {
  readonly type = JuiciosPageActionsTypes.JuiciosChangePage;
  constructor(public payload: { page: number }) {}
}
export class JuiciosPageRequest implements Action {
  readonly type = JuiciosPageActionsTypes.JuiciosPageRequest;
}
export class JuiciosPageRequestSuccess implements Action {
  readonly type = JuiciosPageActionsTypes.JuiciosPageRequestSuccess;
  constructor(public payload: { data: any[]; recordsFiltered: number }) {}
}
export class JuiciosPageRequestFail implements Action {
  readonly type = JuiciosPageActionsTypes.JuiciosPageRequestFail;
  constructor(public payload: { error: any }) {}
}

export class ChangePageOrder implements Action {
  readonly type = JuiciosPageActionsTypes.ChangePageOrder;
  constructor(public payload: { field: string; order: string }) {}
}

export type JuiciosPageActions =
  | JuiciosChangePage
  | JuiciosPageRequest
  | JuiciosPageRequestSuccess
  | JuiciosPageRequestFail
  | ChangePageOrder;
