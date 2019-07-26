import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_SERVICIOS = '[Servicios] Load Servicios';
export const LOAD_SERVICIOS_SUCCESS = '[Servicios] Load Servicios Success';
export const CLEAR_SERVICIOS = '[Servicios] Clear Servicios';
export const CHANGE_ORDER = '[Servicios] Change Order';
export const CHANGE_PARAMS = '[Servicios] Change Params';
export const LOAD_SERVICIOS_FAIL = '[Servicios] Load Servicios Fail';

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

export type acciones =
  | ChangeParamsAction
  | LoadServiciosFailAction
  | ChangeOrderAction
  | LoadServiciosAction
  | LoadServiciosSuccessAction
  | ClearServiciosAction;
