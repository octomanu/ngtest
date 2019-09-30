import { Action } from '@ngrx/store';

export enum EditFormActionsTypes {
  GastosEditRequest = '[Gastos] Edit Request',
  GastosEditRequestSuccess = '[Gastos] Edit Request Success',
  GastosEditRequestFail = '[Gastos] Edit Request Fail',
  GastosUpdateRequest = '[Gastos] Update Request',
  GastosUpdateRequestSuccess = '[Gastos] Edit Update Success',
  GastosUpdateRequestFail = '[Gastos] Edit Update Fail',
  CloseEditForm = '[Gastos] Close Edit Form',
}

export class GastosEditRequest implements Action {
  readonly type = EditFormActionsTypes.GastosEditRequest;
  constructor(public payload: { id: number }) {}
}
export class GastosEditRequestSuccess implements Action {
  readonly type = EditFormActionsTypes.GastosEditRequestSuccess;
  constructor(public payload: { data: any }) {}
}
export class GastosEditRequestFail implements Action {
  readonly type = EditFormActionsTypes.GastosEditRequestFail;
  constructor(public payload: { error: any }) {}
}
export class GastosUpdateRequest implements Action {
  readonly type = EditFormActionsTypes.GastosUpdateRequest;
  constructor(public payload: { data: any }) {}
}
export class GastosUpdateRequestSuccess implements Action {
  readonly type = EditFormActionsTypes.GastosUpdateRequestSuccess;
}
export class GastosUpdateRequestFail implements Action {
  readonly type = EditFormActionsTypes.GastosUpdateRequestFail;
  constructor(public payload: { error: any }) {}
}
export class CloseEditForm implements Action {
  readonly type = EditFormActionsTypes.CloseEditForm;
}

export type EditFormActions =
  | GastosUpdateRequest
  | GastosUpdateRequestSuccess
  | GastosUpdateRequestFail
  | GastosEditRequest
  | GastosEditRequestSuccess
  | GastosEditRequestFail
  | CloseEditForm;
