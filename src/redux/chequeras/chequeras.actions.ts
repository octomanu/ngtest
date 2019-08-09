import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_CHEQUERAS = '[Chequeras] Load Chequeras';
export const LOAD_CHEQUERAS_SUCCESS = '[Chequeras] Load Chequeras Success';
export const CLEAR_CHEQUERAS = '[Chequeras] Clear Chequeras';
export const CHANGE_ORDER = '[Chequeras] Change Order';
export const CHANGE_PARAMS = '[Chequeras] Change Params';
export const LOAD_CHEQUERAS_FAIL = '[Chequeras] Load Chequeras Fail';
export const CLOSE_FILTER = '[Chequeras] Close Filter';
export const OPEN_FILTER = '[Chequeras] Open Filter';
export const CHANGE_FILTER = '[Chequeras] Change Filter';
export const DELETE_CHEQUERAS = '[Chequeras] Delete';

export class ChangeOrderAction implements Action {
  readonly type = CHANGE_ORDER;
  constructor(public field: string, public order: string) {}
}

export class LoadChequerasAction implements Action {
  readonly type = LOAD_CHEQUERAS;
}

export class LoadChequerasSuccessAction implements Action {
  readonly type = LOAD_CHEQUERAS_SUCCESS;
  constructor(public servicios: any[], public recordsFiltered: number) {}
}

export class LoadChequerasFailAction implements Action {
  readonly type = LOAD_CHEQUERAS_FAIL;
  constructor(public error: any) {}
}

export class ClearChequerasAction implements Action {
  readonly type = CLEAR_CHEQUERAS;
}

export class ChangeParamsAction implements Action {
  readonly type = CHANGE_PARAMS;
  constructor(public params: PaginatorParams) {}
}

export class OpenFilterAction implements Action {
  readonly type = OPEN_FILTER;
}

export class CloseFilterAction implements Action {
  readonly type = CLOSE_FILTER;
}

export class ChangeFilterAction implements Action {
  readonly type = CHANGE_FILTER;
  constructor(public filter: { descripcion: string }) {}
}

export class DeleteChequerasAction implements Action {
  readonly type = DELETE_CHEQUERAS;
  constructor(public id: number) {}
}

export type actions =
  | DeleteChequerasAction
  | CloseFilterAction
  | OpenFilterAction
  | ChangeFilterAction
  | ChangeParamsAction
  | LoadChequerasFailAction
  | ChangeOrderAction
  | LoadChequerasAction
  | LoadChequerasSuccessAction
  | ClearChequerasAction;
