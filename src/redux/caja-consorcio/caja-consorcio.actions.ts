import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_CAJA_CONSORCIO = '[Caja Consorcio] Load Caja Consorcio';
export const LOAD_CAJA_CONSORCIO_SUCCESS =
  '[Caja Consorcio] Load Caja Consorcio Success';
export const LOAD_CAJA_CONSORCIO_FAIL =
  '[Caja Consorcio] Load Caja Consorcio Fail';
export const CLEAR_CAJA_CONSORCIO = '[Caja Consorcio] Clear Caja Consorcio';
export const CHANGE_ORDER = '[Caja Consorcio] Change Order';
export const CHANGE_PARAMS = '[Caja Consorcio] Change Params';
export const CLOSE_FILTER = '[Caja Consorcio] Close Filter';
export const OPEN_FILTER = '[Caja Consorcio] Open Filter';
export const CHANGE_FILTER = '[Caja Consorcio] Change Filter';
export const LOAD_SALDOS_SUCCESS = '[Caja Consorcio] Load Saldos Success';

export class LoadSaldosSuccessAction implements Action {
  readonly type = LOAD_SALDOS_SUCCESS;
  constructor(public saldos: any[]) {}
}

export class ChangeOrderAction implements Action {
  readonly type = CHANGE_ORDER;
  constructor(public field: string, public order: string) {}
}

export class LoadCajaConsorcioAction implements Action {
  readonly type = LOAD_CAJA_CONSORCIO;
}

export class LoadCajaConsorcioSuccessAction implements Action {
  readonly type = LOAD_CAJA_CONSORCIO_SUCCESS;
  constructor(public data: any[], public recordsFiltered: number) {}
}

export class LoadCajaConsorcioFailAction implements Action {
  readonly type = LOAD_CAJA_CONSORCIO_FAIL;
  constructor(public error: any) {}
}

export class ClearCajaConsorcioAction implements Action {
  readonly type = CLEAR_CAJA_CONSORCIO;
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
  constructor(public filter: { id_consorcio: number[] }) {}
}

export type actions =
  | ChangeOrderAction
  | LoadCajaConsorcioAction
  | LoadCajaConsorcioFailAction
  | LoadCajaConsorcioSuccessAction
  | ClearCajaConsorcioAction
  | ChangeParamsAction
  | OpenFilterAction
  | CloseFilterAction
  | LoadSaldosSuccessAction
  | ChangeFilterAction;
