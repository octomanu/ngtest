import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_ORDENES_PAGOS = '[Ordenes Pagos] Load Ordenes Pagos';
export const LOAD_ORDENES_PAGOS_SUCCESS =
  '[Ordenes Pagos] Load Ordenes Pagos Success';
export const LOAD_ORDENES_PAGOS_FAIL =
  '[Ordenes Pagos] Load Ordenes Pagos Fail';
export const DELETE_ORDENES_PAGOS = '[Ordenes Pagos] Delete';
export const CLEAR_ORDENES_PAGOS = '[Ordenes Pagos] Clear Ordenes Pagos';
export const CHANGE_ORDER = '[Ordenes Pagos] Change Order';
export const CHANGE_PARAMS = '[Ordenes Pagos] Change Params';
export const CLOSE_FILTER = '[Ordenes Pagos] Close Filter';
export const OPEN_FILTER = '[Ordenes Pagos] Open Filter';
export const CHANGE_FILTER = '[Ordenes Pagos] Change Filter';

export class ChangeOrderAction implements Action {
  readonly type = CHANGE_ORDER;
  constructor(public field: string, public order: string) {}
}

export class LoadOrdenesPagosAction implements Action {
  readonly type = LOAD_ORDENES_PAGOS;
}

export class LoadOrdenesPagosSuccessAction implements Action {
  readonly type = LOAD_ORDENES_PAGOS_SUCCESS;
  constructor(public data: any[], public recordsFiltered: number) {}
}

export class LoadOrdenesPagosFailAction implements Action {
  readonly type = LOAD_ORDENES_PAGOS_FAIL;
  constructor(public error: any) {}
}

export class ClearOrdenesPagosAction implements Action {
  readonly type = CLEAR_ORDENES_PAGOS;
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
  constructor(
    public filter: { banco: string; alias: string; numero_cuenta: string },
  ) {}
}

export class DeleteOrdenesPagosAction implements Action {
  readonly type = DELETE_ORDENES_PAGOS;
  constructor(public id: number) {}
}

export type actions =
  | ChangeOrderAction
  | LoadOrdenesPagosAction
  | LoadOrdenesPagosFailAction
  | LoadOrdenesPagosSuccessAction
  | ClearOrdenesPagosAction
  | ChangeParamsAction
  | OpenFilterAction
  | CloseFilterAction
  | ChangeFilterAction
  | DeleteOrdenesPagosAction;
