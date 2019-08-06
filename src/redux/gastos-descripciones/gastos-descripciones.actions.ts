import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_GASTOS_DESCRIPCIONES =
  '[Gastos Descripciones] Load Gastos Descripciones';
export const LOAD_GASTOS_DESCRIPCIONES_SUCCESS =
  '[Gastos Descripciones] Load Gastos Descripciones Success';
export const LOAD_GASTOS_DESCRIPCIONES_FAIL =
  '[Gastos Descripciones] Load Gastos Descripciones Fail';
export const DELETE_GASTOS_DESCRIPCIONES = '[Gastos Descripciones] Delete';
export const CLEAR_GASTOS_DESCRIPCIONES =
  '[Gastos Descripciones] Clear Gastos Descripciones';
export const CHANGE_ORDER = '[Gastos Descripciones] Change Order';
export const CHANGE_PARAMS = '[Gastos Descripciones] Change Params';
export const CLOSE_FILTER = '[Gastos Descripciones] Close Filter';
export const OPEN_FILTER = '[Gastos Descripciones] Open Filter';
export const CHANGE_FILTER = '[Gastos Descripciones] Change Filter';

export class ChangeOrderAction implements Action {
  readonly type = CHANGE_ORDER;
  constructor(public field: string, public order: string) {}
}

export class LoadGastosDescripcionesAction implements Action {
  readonly type = LOAD_GASTOS_DESCRIPCIONES;
}

export class LoadGastosDescripcionesSuccessAction implements Action {
  readonly type = LOAD_GASTOS_DESCRIPCIONES_SUCCESS;
  constructor(public data: any[], public recordsFiltered: number) {}
}

export class LoadGastosDescripcionesFailAction implements Action {
  readonly type = LOAD_GASTOS_DESCRIPCIONES_FAIL;
  constructor(public error: any) {}
}

export class ClearGastosDescripcionesction implements Action {
  readonly type = CLEAR_GASTOS_DESCRIPCIONES;
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
  constructor(public filter: { titulo: string }) {}
}

export class DeleteGastosDescripcionesAction implements Action {
  readonly type = DELETE_GASTOS_DESCRIPCIONES;
  constructor(public id: number) {}
}

export type actions =
  | ChangeOrderAction
  | LoadGastosDescripcionesAction
  | LoadGastosDescripcionesFailAction
  | LoadGastosDescripcionesSuccessAction
  | ClearGastosDescripcionesction
  | ChangeParamsAction
  | OpenFilterAction
  | CloseFilterAction
  | ChangeFilterAction
  | DeleteGastosDescripcionesAction;
