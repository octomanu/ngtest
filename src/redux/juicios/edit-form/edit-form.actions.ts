import { Action } from '@ngrx/store';

export enum EditFormActionsTypes {
  JuiciosEditRequest = '[Juicios] Edit Request',
  JuiciosEditRequestSuccess = '[Juicios] Edit Request Success',
  JuiciosEditRequestFail = '[Juicios] Edit Request Fail',
  JuiciosUpdateRequest = '[Juicios] Update Request',
  JuiciosUpdateRequestSuccess = '[Juicios] Edit Update Success',
  JuiciosUpdateRequestFail = '[Juicios] Edit Update Fail',
  CloseEditForm = '[Juicios] Close Edit Form',
}

export class JuiciosEditRequest implements Action {
  readonly type = EditFormActionsTypes.JuiciosEditRequest;
  constructor(public payload: { id: number }) {}
}
export class JuiciosEditRequestSuccess implements Action {
  readonly type = EditFormActionsTypes.JuiciosEditRequestSuccess;
  constructor(public payload: { data: any }) {}
}
export class JuiciosEditRequestFail implements Action {
  readonly type = EditFormActionsTypes.JuiciosEditRequestFail;
  constructor(public payload: { error: any }) {}
}
export class JuiciosUpdateRequest implements Action {
  readonly type = EditFormActionsTypes.JuiciosUpdateRequest;
  constructor(public payload: { data: any }) {}
}
export class JuiciosUpdateRequestSuccess implements Action {
  readonly type = EditFormActionsTypes.JuiciosUpdateRequestSuccess;
}
export class JuiciosUpdateRequestFail implements Action {
  readonly type = EditFormActionsTypes.JuiciosUpdateRequestFail;
  constructor(public payload: { error: any }) {}
}
export class CloseEditForm implements Action {
  readonly type = EditFormActionsTypes.CloseEditForm;
}

export type EditFormActions =
  | JuiciosUpdateRequest
  | JuiciosUpdateRequestSuccess
  | JuiciosUpdateRequestFail
  | JuiciosEditRequest
  | JuiciosEditRequestSuccess
  | JuiciosEditRequestFail
  | CloseEditForm;
