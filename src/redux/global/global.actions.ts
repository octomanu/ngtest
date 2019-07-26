import { Action } from '@ngrx/store';

export const CHANGE_VIEWPORT = '[GLOBAL] Change Viewport';

export class ChangeViewportAction implements Action {
  readonly type = CHANGE_VIEWPORT;
  constructor(public small: boolean) {}
}

export type acciones = ChangeViewportAction;
