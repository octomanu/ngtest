import { Action } from '@ngrx/store';

export const SET_USER = '[Auth] Set User';

export class SetUserAction implements Action {
  readonly type = SET_USER;

  constructor(public user: any) {}
}

export type acciones = SetUserAction;
