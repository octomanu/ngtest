import { Action } from '@ngrx/store';
export enum CreateFormActionTypes {
  OpenCreateForm = '[Categorias] Open Create Form',
  CloseCreateForm = '[Categorias] Close Create Form',
  SaveRequest = '[Categorias] Save Request',
  SaveRequestSuccess = '[Categorias] Save Request Success',
  SaveRequestFail = '[Categorias] Save Request Error',
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
