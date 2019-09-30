import { Action } from '@ngrx/store';

export enum DueActionsTypes {
  AddDue = '[Due] Add Due',
  RemoveDue = '[Due] Remove Due',
  DueSaveRequest = '[Due] Save Due Request',
  DueSaveRequestSuccess = '[Due] Save Due Request Success',
  DueSaveRequestError = '[Due] Save Due Request Errror',
}

export class AddDue implements Action {
  readonly type = DueActionsTypes.AddDue;
  constructor(public payload: { due: any }) {}
}

export class RemoveDue implements Action {
  readonly type = DueActionsTypes.RemoveDue;
}

export class DueSaveRequest implements Action {
  readonly type = DueActionsTypes.DueSaveRequest;
}

export class DueSaveRequestSuccess implements Action {
  readonly type = DueActionsTypes.DueSaveRequestSuccess;
}
export class DueSaveRequestError implements Action {
  readonly type = DueActionsTypes.DueSaveRequestError;
  constructor(public payload: { error: any }) {}
}

export type actions =
  | AddDue
  | RemoveDue
  | DueSaveRequest
  | DueSaveRequestSuccess
  | DueSaveRequestError;
