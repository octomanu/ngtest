import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_CUENTA_CORRIENTE_CONSORCIO =
  '[Cuenta Corriente Consorcio] Load Cuenta Corriente Consorcio';
export const LOAD_CUENTA_CORRIENTE_CONSORCIO_SUCCESS =
  '[Cuenta Corriente Consorcio] Load Cuenta Corriente Consorcio Success';
export const LOAD_CUENTA_CORRIENTE_CONSORCIO_FAIL =
  '[Cuenta Corriente Consorcio] Load Cuenta Corriente Consorcio Fail';
export const DELETE_CUENTA_CORRIENTE_CONSORCIO =
  '[Cuenta Corriente Consorcio] Delete';
export const CLEAR_CUENTA_CORRIENTE_CONSORCIO =
  '[Cuenta Corriente Consorcio] Clear Cuenta Corriente Consorcio';
export const CHANGE_ORDER = '[Cuenta Corriente Consorcio] Change Order';
export const CHANGE_PARAMS = '[Cuenta Corriente Consorcio] Change Params';
export const CLOSE_FILTER = '[Cuenta Corriente Consorcio] Close Filter';
export const OPEN_FILTER = '[Cuenta Corriente Consorcio] Open Filter';
export const CHANGE_FILTER = '[Cuenta Corriente Consorcio] Change Filter';
export const CHANGE_CONSORCIO = '[Cuenta Corriente Consorcio] Change Consorcio';

export class ChangeConsorcioAction implements Action {
  readonly type = CHANGE_CONSORCIO;
  constructor(public idConsorcio: number) {}
}

export class ChangeOrderAction implements Action {
  readonly type = CHANGE_ORDER;
  constructor(public field: string, public order: string) {}
}

export class LoadCuentaCorrienteConsorcioAction implements Action {
  readonly type = LOAD_CUENTA_CORRIENTE_CONSORCIO;
}

export class LoadCuentaCorrienteConsorcioSuccessAction implements Action {
  readonly type = LOAD_CUENTA_CORRIENTE_CONSORCIO_SUCCESS;
  constructor(public data: any[], public recordsFiltered: number) {}
}

export class LoadCuentaCorrienteConsorcioFailAction implements Action {
  readonly type = LOAD_CUENTA_CORRIENTE_CONSORCIO_FAIL;
  constructor(public error: any) {}
}

export class ClearCuentaCorrienteConsorcioAction implements Action {
  readonly type = CLEAR_CUENTA_CORRIENTE_CONSORCIO;
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

export class DeleteCuentaCorrienteConsorcioAction implements Action {
  readonly type = DELETE_CUENTA_CORRIENTE_CONSORCIO;
  constructor(public id: number) {}
}

export type actions =
  | ChangeConsorcioAction
  | ChangeOrderAction
  | LoadCuentaCorrienteConsorcioAction
  | LoadCuentaCorrienteConsorcioFailAction
  | LoadCuentaCorrienteConsorcioSuccessAction
  | ClearCuentaCorrienteConsorcioAction
  | ChangeParamsAction
  | OpenFilterAction
  | CloseFilterAction
  | ChangeFilterAction
  | DeleteCuentaCorrienteConsorcioAction;
