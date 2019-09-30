import { Action } from '@ngrx/store';

export enum EditFormActionsTypes {
  CategoriasEditRequest = '[Categorias] Edit Request',
  CategoriasEditRequestSuccess = '[Categorias] Edit Request Success',
  CategoriasEditRequestFail = '[Categorias] Edit Request Fail',
  CategoriasUpdateRequest = '[Categorias] Update Request',
  CategoriasUpdateRequestSuccess = '[Categorias] Edit Update Success',
  CategoriasUpdateRequestFail = '[Categorias] Edit Update Fail',
  CloseEditForm = '[Categorias] Close Edit Form',
}

export class CategoriasEditRequest implements Action {
  readonly type = EditFormActionsTypes.CategoriasEditRequest;
  constructor(public payload: { id: number }) {}
}
export class CategoriasEditRequestSuccess implements Action {
  readonly type = EditFormActionsTypes.CategoriasEditRequestSuccess;
  constructor(public payload: { data: any }) {}
}
export class CategoriasEditRequestFail implements Action {
  readonly type = EditFormActionsTypes.CategoriasEditRequestFail;
  constructor(public payload: { error: any }) {}
}
export class CategoriasUpdateRequest implements Action {
  readonly type = EditFormActionsTypes.CategoriasUpdateRequest;
  constructor(public payload: { data: any }) {}
}
export class CategoriasUpdateRequestSuccess implements Action {
  readonly type = EditFormActionsTypes.CategoriasUpdateRequestSuccess;
}
export class CategoriasUpdateRequestFail implements Action {
  readonly type = EditFormActionsTypes.CategoriasUpdateRequestFail;
  constructor(public payload: { error: any }) {}
}
export class CloseEditForm implements Action {
  readonly type = EditFormActionsTypes.CloseEditForm;
}

export type EditFormActions =
  | CategoriasUpdateRequest
  | CategoriasUpdateRequestSuccess
  | CategoriasUpdateRequestFail
  | CategoriasEditRequest
  | CategoriasEditRequestSuccess
  | CategoriasEditRequestFail
  | CloseEditForm;
