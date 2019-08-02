import { Action } from '@ngrx/store';

export const CHANGE_VIEWPORT = '[GLOBAL] Change Viewport';
export const CHANGE_HELP = '[GLOBAL] Change Help';
export const CHANGE_KEEP_HELP = '[GLOBAL] Change Keep Help';
export const SHOW_MODAL_HELP = '[GLOBAL] Show Modal Help';
export const HIDE_MODAL_HELP = '[GLOBAL] Hide Modal Help';

export class ChangeViewportAction implements Action {
  readonly type = CHANGE_VIEWPORT;
  constructor(public small: boolean) {}
}

export class ChangeHelpAction implements Action {
  readonly type = CHANGE_HELP;
  constructor(public help: boolean) {}
}

export class ChangeKeepHelpAction implements Action {
  readonly type = CHANGE_KEEP_HELP;
  constructor(public keepHelp: boolean) {}
}

export class ShowModalHelpAction implements Action {
  readonly type = SHOW_MODAL_HELP;
  constructor(public url: string) {}
}

export class HideModalHelpAction implements Action {
  readonly type = HIDE_MODAL_HELP;
  constructor() {}
}

export type acciones =
  | ChangeViewportAction
  | ChangeHelpAction
  | ChangeKeepHelpAction
  | HideModalHelpAction
  | ShowModalHelpAction;
