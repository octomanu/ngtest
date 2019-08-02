import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_SERVICIOS = '[Servicios] Load Servicios';
export const LOAD_SERVICIOS_SUCCESS = '[Servicios] Load Servicios Success';
export const CLEAR_SERVICIOS = '[Servicios] Clear Servicios';
export const CHANGE_ORDER = '[Servicios] Change Order';
export const CHANGE_PARAMS = '[Servicios] Change Params';
export const LOAD_SERVICIOS_FAIL = '[Servicios] Load Servicios Fail';
export const CLOSE_FILTER = '[Servicios] Close Filter';
export const OPEN_FILTER = '[Servicios] Open Filter';
export const CHANGE_FILTER = '[Servicios] Change Filter';
export const DELETE_SERVICIO = '[Servicios] Delete';

export class ChangeOrderAction implements Action {
  readonly type = CHANGE_ORDER;
  constructor(public field: string, public order: string) {}
}

export class LoadServiciosAction implements Action {
  readonly type = LOAD_SERVICIOS;
}

export class LoadServiciosSuccessAction implements Action {
  readonly type = LOAD_SERVICIOS_SUCCESS;
  constructor(public servicios: any[], public recordsFiltered: number) {}
}

export class LoadServiciosFailAction implements Action {
  readonly type = LOAD_SERVICIOS_FAIL;
  constructor(public error: any) {}
}

export class ClearServiciosAction implements Action {
  readonly type = CLEAR_SERVICIOS;
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

export class DeleteServicioAction implements Action {
  readonly type = DELETE_SERVICIO;
  constructor(public id: number) {}
}

export type acciones =
  | DeleteServicioAction
  | CloseFilterAction
  | OpenFilterAction
  | ChangeFilterAction
  | ChangeParamsAction
  | LoadServiciosFailAction
  | ChangeOrderAction
  | LoadServiciosAction
  | LoadServiciosSuccessAction
  | ClearServiciosAction;
