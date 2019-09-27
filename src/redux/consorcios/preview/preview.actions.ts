import { Action } from '@ngrx/store';

export enum previewActionTypes {
  previewRequest = '[Expensas] Preview request',
  previewRequestSuccess = '[Expensas] Preview request success',
  previewRequestError = '[Expensas] Preview request error',
}

export class PreviewRequest implements Action {
  readonly type = previewActionTypes.previewRequest;
  constructor(public payload: { idConsorcio: string }) {}
}

export class PreviewRequestSuccess implements Action {
  readonly type = previewActionTypes.previewRequestSuccess;
  constructor(public payload: { html: string }) {}
}

export class PreviewRequestError implements Action {
  readonly type = previewActionTypes.previewRequestError;
  constructor(public payload: { error: any }) {}
}

export type actions =
  | PreviewRequest
  | PreviewRequestSuccess
  | PreviewRequestError;
