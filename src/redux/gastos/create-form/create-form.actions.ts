import { Action } from '@ngrx/store';
export enum CreateFormActionTypes {
  OpenCreateForm = '[Gastos] Open Create Form',
  CloseCreateForm = '[Gastos] Close Create Form',
  SaveRequest = '[Gastos] Save Request',
  SaveRequestSuccess = '[Gastos] Save Request Success',
  SaveRequestFail = '[Gastos] Save Request Error',
}

export class OpenCreateForm implements Action {
  readonly type = CreateFormActionTypes.OpenCreateForm;
}
export class CloseCreateForm implements Action {
  readonly type = CreateFormActionTypes.CloseCreateForm;
}
export class SaveRequest implements Action {
  readonly type = CreateFormActionTypes.SaveRequest;
  constructor(public payload: { data: any }) {}
}
export class SaveRequestSuccess implements Action {
  readonly type = CreateFormActionTypes.SaveRequestSuccess;
  constructor(public payload: { data: any }) {}
}
export class SaveRequestFail implements Action {
  readonly type = CreateFormActionTypes.SaveRequestFail;
  constructor(public payload: { error: any }) {}
}

export type CreateFormActions =
  | OpenCreateForm
  | CloseCreateForm
  | SaveRequest
  | SaveRequestSuccess
  | SaveRequestFail;
