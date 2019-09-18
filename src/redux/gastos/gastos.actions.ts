import { Action } from '@ngrx/store';

export enum GastosActionsTypes {
  GastosAddDue = '[Gastos] Add Due',
  GastosRemoveDue = '[Gastos] Remove Due',
  GastosDueSaveRequest = '[Gastos] Save Due Request',
  GastosDueSaveRequestSuccess = '[Gastos] Save Due Request Success',
  GastosDueSaveRequestError = '[Gastos] Save Due Request Errror',
}

export class GastosAddDue implements Action {
  readonly type = GastosActionsTypes.GastosAddDue;
  constructor(public payload: { due: any }) {}
}

export class GastosRemoveDue implements Action {
  readonly type = GastosActionsTypes.GastosRemoveDue;
}

export class GastosDueSaveRequest implements Action {
  readonly type = GastosActionsTypes.GastosDueSaveRequest;
}

export class GastosDueSaveRequestSuccess implements Action {
  readonly type = GastosActionsTypes.GastosDueSaveRequestSuccess;
}
export class GastosDueSaveRequestError implements Action {
  readonly type = GastosActionsTypes.GastosDueSaveRequestError;
  constructor(public payload: { error: any }) {}
}

export type actions =
  | GastosAddDue
  | GastosRemoveDue
  | GastosDueSaveRequest
  | GastosDueSaveRequestSuccess
  | GastosDueSaveRequestError;
