import { Action } from '@ngrx/store';
import { PaginatorParams } from 'redux/paginator-params.model';

export const LOAD_CUENTA_CORRIENTE_PROVEEDOR =
  '[Cuenta Corriente Proveedor] Load Cuenta Corriente Proveedor';
export const LOAD_CUENTA_CORRIENTE_PROVEEDOR_SUCCESS =
  '[Cuenta Corriente Proveedor] Load Cuenta Corriente Proveedor Success';
export const LOAD_CUENTA_CORRIENTE_PROVEEDOR_FAIL =
  '[Cuenta Corriente Proveedor] Load Cuenta Corriente Proveedor Fail';
export const DELETE_CUENTA_CORRIENTE_PROVEEDOR =
  '[Cuenta Corriente Proveedor] Delete';
export const CLEAR_CUENTA_CORRIENTE_PROVEEDOR =
  '[Cuenta Corriente Proveedor] Clear Cuenta Corriente Proveedor';
export const CHANGE_ORDER = '[Cuenta Corriente Proveedor] Change Order';
export const CHANGE_PARAMS = '[Cuenta Corriente Proveedor] Change Params';
export const CLOSE_FILTER = '[Cuenta Corriente Proveedor] Close Filter';
export const OPEN_FILTER = '[Cuenta Corriente Proveedor] Open Filter';
export const CHANGE_FILTER = '[Cuenta Corriente Proveedor] Change Filter';
export const CHANGE_PROVEEDOR = '[Cuenta Corriente Proveedor] Change Proveedor';

export class ChangeProveedorAction implements Action {
  readonly type = CHANGE_PROVEEDOR;
  constructor(public idProveedor: number) {}
}

export class ChangeOrderAction implements Action {
  readonly type = CHANGE_ORDER;
  constructor(public field: string, public order: string) {}
}

export class LoadCuentaCorrienteProveedorAction implements Action {
  readonly type = LOAD_CUENTA_CORRIENTE_PROVEEDOR;
}

export class LoadCuentaCorrienteProveedorSuccessAction implements Action {
  readonly type = LOAD_CUENTA_CORRIENTE_PROVEEDOR_SUCCESS;
  constructor(public data: any[], public recordsFiltered: number) {}
}

export class LoadCuentaCorrienteProveedorFailAction implements Action {
  readonly type = LOAD_CUENTA_CORRIENTE_PROVEEDOR_FAIL;
  constructor(public error: any) {}
}

export class ClearCuentaCorrienteProveedorAction implements Action {
  readonly type = CLEAR_CUENTA_CORRIENTE_PROVEEDOR;
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

export class DeleteCuentaCorrienteProveedorAction implements Action {
  readonly type = DELETE_CUENTA_CORRIENTE_PROVEEDOR;
  constructor(public id: number) {}
}

export type actions =
  | ChangeProveedorAction
  | ChangeOrderAction
  | LoadCuentaCorrienteProveedorAction
  | LoadCuentaCorrienteProveedorFailAction
  | LoadCuentaCorrienteProveedorSuccessAction
  | ClearCuentaCorrienteProveedorAction
  | ChangeParamsAction
  | OpenFilterAction
  | CloseFilterAction
  | ChangeFilterAction
  | DeleteCuentaCorrienteProveedorAction;
