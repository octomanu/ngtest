import { Action } from '@ngrx/store';

export const LOAD_SERVICIOS = '[Servicios] Load Servicios';
export const CLEAR_SERVICIOS = '[Servicios] Clear Servicios';

export class LoadServiciosAction implements Action {
  readonly type = LOAD_SERVICIOS;

  constructor(public servicios: any[]) {}
}

export class ClearServiciosAction implements Action {
  readonly type = CLEAR_SERVICIOS;
}

export type acciones = LoadServiciosAction | ClearServiciosAction;
