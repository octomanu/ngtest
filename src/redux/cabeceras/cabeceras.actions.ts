import { Action } from '@ngrx/store';

export enum CabecerasActionsTypes {
  CabecerasChangePage = '[Cabeceras] Change Page',
  CabecerasPageRequest = '[Cabeceras] Page Request',
  CabecerasPageRequestSuccess = '[Cabeceras] Page Request Success',
  CabecerasPageRequestFail = '[Cabeceras] Page Request Fail',
  CabecerasEditRequest = '[Cabeceras] Edit Request',
  CabecerasEditRequestSuccess = '[Cabeceras] Edit Request Success',
  CabecerasEditRequestFail = '[Cabeceras] Edit Request Fail',

  CabecerasUpdateRequest = '[Cabeceras] Update Request',
  CabecerasUpdateRequestSuccess = '[Cabeceras] Edit Update Success',
  CabecerasUpdateRequestFail = '[Cabeceras] Edit Update Fail',

  ChangePageFilters = '[Cabeceras] Change Page Filters',
  ChangePageOrder = '[Cabeceras] Change Page Order',
  DeleteCabeceraRequest = '[Cabeceras] Delete Request',
  DeleteCabeceraSuccess = '[Cabeceras] Delete Request Success',
  DeleteCabeceraError = '[Cabeceras] Delete Request Error',
  CloseEditForm = '[Cabeceras] Close Edit Form',
  OpenFilterForm = '[Cabeceras] Open Filer Form',
  CloseFilterForm = '[Cabeceras] Close Filter Form',
}

export class CabecerasChangePage implements Action {
  readonly type = CabecerasActionsTypes.CabecerasChangePage;
  constructor(public payload: { page: number }) {}
}
export class CabecerasPageRequest implements Action {
  readonly type = CabecerasActionsTypes.CabecerasPageRequest;
}
export class CabecerasPageRequestSuccess implements Action {
  readonly type = CabecerasActionsTypes.CabecerasPageRequestSuccess;
  constructor(public payload: { data: any[]; recordsFiltered: number }) {}
}
export class CabecerasPageRequestFail implements Action {
  readonly type = CabecerasActionsTypes.CabecerasPageRequestFail;
  constructor(public payload: { error: any }) {}
}
export class CabecerasEditRequest implements Action {
  readonly type = CabecerasActionsTypes.CabecerasEditRequest;
  constructor(public payload: { id: number }) {}
}
export class CabecerasEditRequestSuccess implements Action {
  readonly type = CabecerasActionsTypes.CabecerasEditRequestSuccess;
  constructor(public payload: { data: any }) {}
}
export class CabecerasEditRequestFail implements Action {
  readonly type = CabecerasActionsTypes.CabecerasEditRequestFail;
  constructor(public payload: { error: any }) {}
}
export class CabecerasUpdateRequest implements Action {
  readonly type = CabecerasActionsTypes.CabecerasUpdateRequest;
  constructor(public payload: { data: any }) {}
}
export class CabecerasUpdateRequestSuccess implements Action {
  readonly type = CabecerasActionsTypes.CabecerasUpdateRequestSuccess;
  constructor(public payload: { data: any }) {}
}
export class CabecerasUpdateRequestFail implements Action {
  readonly type = CabecerasActionsTypes.CabecerasUpdateRequestFail;
  constructor(public payload: { error: any }) {}
}
export class ChangePageFilters implements Action {
  readonly type = CabecerasActionsTypes.ChangePageFilters;
}
export class ChangePageOrder implements Action {
  readonly type = CabecerasActionsTypes.ChangePageOrder;
  constructor(public payload: { field: string; order: string }) {}
}
export class DeleteCabeceraRequest implements Action {
  readonly type = CabecerasActionsTypes.DeleteCabeceraRequest;
}
export class DeleteCabeceraSuccess implements Action {
  readonly type = CabecerasActionsTypes.DeleteCabeceraSuccess;
}
export class DeleteCabeceraError implements Action {
  readonly type = CabecerasActionsTypes.DeleteCabeceraError;
  constructor(public payload: { error: any }) {}
}
export class CloseEditForm implements Action {
  readonly type = CabecerasActionsTypes.CloseEditForm;
}
export class OpenFilterForm implements Action {
  readonly type = CabecerasActionsTypes.OpenFilterForm;
}
export class CloseFilterForm implements Action {
  readonly type = CabecerasActionsTypes.CloseFilterForm;
}

export type CabecerasActions =
  | CabecerasUpdateRequest
  | CabecerasUpdateRequestSuccess
  | CabecerasUpdateRequestFail
  | CabecerasChangePage
  | CabecerasPageRequest
  | CabecerasPageRequestSuccess
  | CabecerasPageRequestFail
  | CabecerasEditRequest
  | CabecerasEditRequestSuccess
  | CabecerasEditRequestFail
  | ChangePageFilters
  | ChangePageOrder
  | DeleteCabeceraRequest
  | DeleteCabeceraSuccess
  | DeleteCabeceraError
  | CloseEditForm
  | OpenFilterForm
  | CloseFilterForm;
