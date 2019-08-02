import { Action } from '@ngrx/store';

export const UPDATE_MENU = '[Menu] Update Menu';
export const LOAD_MENU = '[Menu] Load Menu';

export class UpdateMenuAction implements Action {
  readonly type = UPDATE_MENU;
  constructor(public menu: any[]) {}
}

export class LoadMenuAction implements Action {
  readonly type = LOAD_MENU;
  constructor(public menu: any[]) {}
}

export type actions = LoadMenuAction | UpdateMenuAction;
