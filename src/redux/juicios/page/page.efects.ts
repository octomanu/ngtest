import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import {
  JuiciosPageActionsTypes,
  JuiciosPageRequestSuccess,
  JuiciosPageRequestFail,
} from './page.actions';

import { of } from 'rxjs';
import { JuiciosService } from '@core/http/juicios/juicios.service';
@Injectable()
export class PageEffects {
  constructor(
    protected actions$: Actions,
    protected juiciosService: JuiciosService,
  ) {}

  loadTableData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        JuiciosPageActionsTypes.JuiciosPageRequest,
        JuiciosPageActionsTypes.ChangePageOrder,
        JuiciosPageActionsTypes.JuiciosChangePage,
      ),
      mergeMap(() => this.searchTableData()),
    );
  });

  private searchTableData() {
    return this.juiciosService.paginate().pipe(
      map(
        (resp: any) =>
          new JuiciosPageRequestSuccess({
            data: resp.data,
            recordsFiltered: resp.recordsFiltered,
          }),
      ),
      catchError(error => of(new JuiciosPageRequestFail(error))),
    );
  }
}
