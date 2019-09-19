import { Action } from '@ngrx/store';

export enum DeleteActionsType {
  DeleteRequest = '[Gastos] Delete Request',
  DeleteRequestSuccess = '[Gastos] Delete Request Success',
  DeleteRequestFail = '[Gastos] Delete Request Fail',
}

export class DeleteRequest implements Action {
  readonly type = DeleteActionsType.DeleteRequest;
  constructor(public payload: { id: number }) {}
}

export class DeleteRequestSuccess implements Action {
  readonly type = DeleteActionsType.DeleteRequestSuccess;
}

export class DeleteRequestFail implements Action {
  readonly type = DeleteActionsType.DeleteRequestFail;
  constructor(public payload: { error: any }) {}
}

export type DeleteActions =
  | DeleteRequest
  | DeleteRequestSuccess
  | DeleteRequestFail;
