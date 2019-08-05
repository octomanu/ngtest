import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_CUENTAS_BANCARIAS =
  '[Cuentas Bancarias] Load Cuentas Bancarias';
export const LOAD_CUENTAS_BANCARIAS_SUCCESS =
  '[Cuentas Bancarias] Load Cuentas Bancarias Success';
export const LOAD_CUENTAS_BANCARIAS_FAIL =
  '[Cuentas Bancarias] Load Cuentas Bancarias Fail';
export const DELETE_CUENTAS_BANCARIAS = '[Cuentas Bancarias] Delete';
export const CLEAR_CUENTAS_BANCARIAS =
  '[Cuentas Bancarias] Clear Cuentas Bancarias';
export const CHANGE_ORDER = '[Cuentas Bancarias] Change Order';
export const CHANGE_PARAMS = '[Cuentas Bancarias] Change Params';
export const CLOSE_FILTER = '[Cuentas Bancarias] Close Filter';
export const OPEN_FILTER = '[Cuentas Bancarias] Open Filter';
export const CHANGE_FILTER = '[Cuentas Bancarias] Change Filter';

export class ChangeOrderAction implements Action {
  readonly type = CHANGE_ORDER;
  constructor(public field: string, public order: string) {}
}

export class LoadCuentasBancariasAction implements Action {
  readonly type = LOAD_CUENTAS_BANCARIAS;
}

export class LoadCuentasBancariasSuccessAction implements Action {
  readonly type = LOAD_CUENTAS_BANCARIAS_SUCCESS;
  constructor(public data: any[], public recordsFiltered: number) {}
}

export class LoadCuentasBancariasFailAction implements Action {
  readonly type = LOAD_CUENTAS_BANCARIAS_FAIL;
  constructor(public error: any) {}
}

export class ClearCuentasBancariasAction implements Action {
  readonly type = CLEAR_CUENTAS_BANCARIAS;
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

export class DeleteCuentasBancariasAction implements Action {
  readonly type = DELETE_CUENTAS_BANCARIAS;
  constructor(public id: number) {}
}

export type actions =
  | ChangeOrderAction
  | LoadCuentasBancariasAction
  | LoadCuentasBancariasFailAction
  | LoadCuentasBancariasSuccessAction
  | ClearCuentasBancariasAction
  | ChangeParamsAction
  | OpenFilterAction
  | CloseFilterAction
  | ChangeFilterAction
  | DeleteCuentasBancariasAction;
