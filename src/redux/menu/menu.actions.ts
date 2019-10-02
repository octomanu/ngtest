import { Action } from '@ngrx/store';

export const REQUEST_MENU = '[Menu] Menu Request';
export const UPDATE_MENU = '[Menu] Update Menu';
export const LOAD_MENU = '[Menu] Load Menu';
export const DELETE_MENU = '[Menu] Delete Menu';

export class MenuRequest implements Action {
  readonly type = REQUEST_MENU;
}

export class UpdateMenuAction implements Action {
  readonly type = UPDATE_MENU;
  constructor(public menu: any[]) {}
}

export class LoadMenuAction implements Action {
  readonly type = LOAD_MENU;
  constructor(public menu: any[]) {}
}

export class DeleteMenuAction implements Action {
  readonly type = DELETE_MENU;
}

export type actions = LoadMenuAction | UpdateMenuAction | DeleteMenuAction;
