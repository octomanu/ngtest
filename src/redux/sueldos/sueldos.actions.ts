import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_SUELDOS = '[Sueldos] Load Sueldos';
export const LOAD_SUELDOS_SUCCESS = '[Sueldos] Load Sueldos Success';
export const LOAD_SUELDOS_FAIL = '[Sueldos] Load Sueldos Fail';
export const DELETE_SUELDOS = '[Sueldos] Delete';
export const CLEAR_SUELDOS = '[Sueldos] Clear Sueldos';
export const CHANGE_ORDER = '[Sueldos] Change Order';
export const CHANGE_PARAMS = '[Sueldos] Change Params';
export const CLOSE_FILTER = '[Sueldos] Close Filter';
export const OPEN_FILTER = '[Sueldos] Open Filter';
export const CHANGE_FILTER = '[Sueldos] Change Filter';
export const CHANGE_EMPLEADO = '[Sueldos] Change Empleado';

export class ChangeEmpleadoAction implements Action {
  readonly type = CHANGE_EMPLEADO;
  constructor(public idEmpleado: number) {}
}

export class ChangeOrderAction implements Action {
  readonly type = CHANGE_ORDER;
  constructor(public field: string, public order: string) {}
}

export class LoadSueldosAction implements Action {
  readonly type = LOAD_SUELDOS;
}

export class LoadSueldosSuccessAction implements Action {
  readonly type = LOAD_SUELDOS_SUCCESS;
  constructor(public data: any[], public recordsFiltered: number) {}
}

export class LoadSueldosFailAction implements Action {
  readonly type = LOAD_SUELDOS_FAIL;
  constructor(public error: any) {}
}

export class ClearSueldosAction implements Action {
  readonly type = CLEAR_SUELDOS;
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
    public filter: { descripcion: string; fecha: string; monto: string },
  ) {}
}

export class DeleteSueldosAction implements Action {
  readonly type = DELETE_SUELDOS;
  constructor(public id: number) {}
}

export type actions =
  | ChangeEmpleadoAction
  | ChangeOrderAction
  | LoadSueldosAction
  | LoadSueldosFailAction
  | LoadSueldosSuccessAction
  | ClearSueldosAction
  | ChangeParamsAction
  | OpenFilterAction
  | CloseFilterAction
  | ChangeFilterAction
  | DeleteSueldosAction;
