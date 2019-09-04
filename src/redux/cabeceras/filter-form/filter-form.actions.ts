import { Action } from '@ngrx/store';

export enum CabecerasFilterTypes {
  OpenFilterForm = '[Cabeceras] Open Filter Form',
  CloseFilterForm = '[Cabeceras] Close Filter Form',
}

export class OpenFilterForm implements Action {
  readonly type = CabecerasFilterTypes.OpenFilterForm;
}
export class CloseFilterForm implements Action {
  readonly type = CabecerasFilterTypes.CloseFilterForm;
}

export type CabecerasFilterActions = OpenFilterForm | CloseFilterForm;
