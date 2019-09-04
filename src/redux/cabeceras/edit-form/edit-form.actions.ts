import { Action } from '@ngrx/store';

export enum EditFormActionsTypes {
  CabecerasEditRequest = '[Cabeceras] Edit Request',
  CabecerasEditRequestSuccess = '[Cabeceras] Edit Request Success',
  CabecerasEditRequestFail = '[Cabeceras] Edit Request Fail',
  CabecerasUpdateRequest = '[Cabeceras] Update Request',
  CabecerasUpdateRequestSuccess = '[Cabeceras] Edit Update Success',
  CabecerasUpdateRequestFail = '[Cabeceras] Edit Update Fail',
  CloseEditForm = '[Cabeceras] Close Edit Form',
}

export class CabecerasEditRequest implements Action {
  readonly type = EditFormActionsTypes.CabecerasEditRequest;
  constructor(public payload: { id: number }) {}
}
export class CabecerasEditRequestSuccess implements Action {
  readonly type = EditFormActionsTypes.CabecerasEditRequestSuccess;
  constructor(public payload: { data: any }) {}
}
export class CabecerasEditRequestFail implements Action {
  readonly type = EditFormActionsTypes.CabecerasEditRequestFail;
  constructor(public payload: { error: any }) {}
}
export class CabecerasUpdateRequest implements Action {
  readonly type = EditFormActionsTypes.CabecerasUpdateRequest;
  constructor(public payload: { data: any }) {}
}
export class CabecerasUpdateRequestSuccess implements Action {
  readonly type = EditFormActionsTypes.CabecerasUpdateRequestSuccess;
  constructor(public payload: { data: any }) {}
}
export class CabecerasUpdateRequestFail implements Action {
  readonly type = EditFormActionsTypes.CabecerasUpdateRequestFail;
  constructor(public payload: { error: any }) {}
}
export class CloseEditForm implements Action {
  readonly type = EditFormActionsTypes.CloseEditForm;
}

export type EditFormActions =
  | CabecerasUpdateRequest
  | CabecerasUpdateRequestSuccess
  | CabecerasUpdateRequestFail
  | CabecerasEditRequest
  | CabecerasEditRequestSuccess
  | CabecerasEditRequestFail
  | CloseEditForm;
