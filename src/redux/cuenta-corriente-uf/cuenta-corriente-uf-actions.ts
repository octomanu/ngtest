import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_CUENTA_CORRIENTE_UF =
  '[Cuenta Corriente Uf] Load Cuenta Corriente Uf';
export const LOAD_CUENTA_CORRIENTE_UF_SUCCESS =
  '[Cuenta Corriente Uf] Load Cuenta Corriente Uf Success';
export const LOAD_CUENTA_CORRIENTE_UF_FAIL =
  '[Cuenta Corriente Uf] Load Cuenta Corriente Uf Fail';
export const DELETE_UF_CONSORCIO = '[Cuenta Corriente Uf] Delete';
export const CLEAR_UF_CONSORCIO =
  '[Cuenta Corriente Uf] Clear Cuenta Corriente Uf';
export const CHANGE_ORDER = '[Cuenta Corriente Uf] Change Order';
export const CHANGE_PARAMS = '[Cuenta Corriente Uf] Change Params';
export const CLOSE_FILTER = '[Cuenta Corriente Uf] Close Filter';
export const OPEN_FILTER = '[Cuenta Corriente Uf] Open Filter';
export const CHANGE_FILTER = '[Cuenta Corriente Uf] Change Filter';
export const CHANGE_CONSORCIO = '[Cuenta Corriente Uf] Change Consorcio';
export const CHANGE_UF = '[Cuenta Corriente Uf] Change Uf';

export class ChangeConsorcioAction implements Action {
  readonly type = CHANGE_CONSORCIO;
  constructor(public idConsorcio: number) {}
}

export class ChangeUfAction implements Action {
  readonly type = CHANGE_UF;
  constructor(public idUf: number) {}
}

export class ChangeOrderAction implements Action {
  readonly type = CHANGE_ORDER;
  constructor(public field: string, public order: string) {}
}

export class LoadCuentaCorrienteUfAction implements Action {
  readonly type = LOAD_CUENTA_CORRIENTE_UF;
}

export class LoadCuentaCorrienteUfSuccessAction implements Action {
  readonly type = LOAD_CUENTA_CORRIENTE_UF_SUCCESS;
  constructor(public data: any[], public recordsFiltered: number) {}
}

export class LoadCuentaCorrienteUfFailAction implements Action {
  readonly type = LOAD_CUENTA_CORRIENTE_UF_FAIL;
  constructor(public error: any) {}
}

export class ClearCuentaCorrienteUfAction implements Action {
  readonly type = CLEAR_UF_CONSORCIO;
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

export class DeleteCuentaCorrienteUfAction implements Action {
  readonly type = DELETE_UF_CONSORCIO;
  constructor(public id: number) {}
}

export type actions =
  | ChangeUfAction
  | ChangeConsorcioAction
  | ChangeOrderAction
  | LoadCuentaCorrienteUfAction
  | LoadCuentaCorrienteUfFailAction
  | LoadCuentaCorrienteUfSuccessAction
  | ClearCuentaCorrienteUfAction
  | ChangeParamsAction
  | OpenFilterAction
  | CloseFilterAction
  | ChangeFilterAction
  | DeleteCuentaCorrienteUfAction;
