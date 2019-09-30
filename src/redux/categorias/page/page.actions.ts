import { Action } from '@ngrx/store';

export enum CategoriasPageActionsTypes {
  CategoriasChangePage = '[Categorias] Change Page',
  CategoriasPageRequest = '[Categorias] Page Request',
  CategoriasPageRequestSuccess = '[Categorias] Page Request Success',
  CategoriasPageRequestFail = '[Categorias] Page Request Fail',
  ChangePageFilters = '[Categorias] Change Page Filters',
  ChangePageOrder = '[Categorias] Change Page Order',
}

export class CategoriasChangePage implements Action {
  readonly type = CategoriasPageActionsTypes.CategoriasChangePage;
  constructor(public payload: { page: number }) {}
}
export class CategoriasPageRequest implements Action {
  readonly type = CategoriasPageActionsTypes.CategoriasPageRequest;
}
export class CategoriasPageRequestSuccess implements Action {
  readonly type = CategoriasPageActionsTypes.CategoriasPageRequestSuccess;
  constructor(public payload: { data: any[]; recordsFiltered: number }) {}
}
export class CategoriasPageRequestFail implements Action {
  readonly type = CategoriasPageActionsTypes.CategoriasPageRequestFail;
  constructor(public payload: { error: any }) {}
}

export class ChangePageOrder implements Action {
  readonly type = CategoriasPageActionsTypes.ChangePageOrder;
  constructor(public payload: { field: string; order: string }) {}
}

export type CategoriasPageActions =
  | CategoriasChangePage
  | CategoriasPageRequest
  | CategoriasPageRequestSuccess
  | CategoriasPageRequestFail
  | ChangePageOrder;
