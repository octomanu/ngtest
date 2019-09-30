import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import {
  CategoriasPageActionsTypes,
  CategoriasPageRequestSuccess,
  CategoriasPageRequestFail,
} from './page.actions';

import { of } from 'rxjs';
import { CategoriasService } from '@core/http/categorias/categorias.service';
@Injectable()
export class PageEffects {
  constructor(
    protected actions$: Actions,
    protected categoriasService: CategoriasService,
  ) {}

  loadTableData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CategoriasPageActionsTypes.CategoriasPageRequest,
        CategoriasPageActionsTypes.ChangePageOrder,
        CategoriasPageActionsTypes.CategoriasChangePage,
      ),
      mergeMap(() => this.searchTableData()),
    );
  });

  private searchTableData() {
    return this.categoriasService.paginate().pipe(
      map(
        (resp: any) =>
          new CategoriasPageRequestSuccess({
            data: resp.data,
            recordsFiltered: resp.recordsFiltered,
          }),
      ),
      catchError(error => of(new CategoriasPageRequestFail(error))),
    );
  }
}
