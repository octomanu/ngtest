import { Action } from '@ngrx/store';

export enum DeleteActionsType {
  DeleteRequest = '[Cabeceras] Delete Request',
  DeleteRequestSuccess = '[Cabeceras] Delete Request Success',
  DeleteRequestFail = '[Cabeceras] Delete Request Fail',
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
