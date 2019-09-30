import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GastosService } from '@core/http/gastos/gastos.service';
import {
  GastosPageActionsTypes,
  GastosPageRequestSuccess,
  GastosPageRequestFail,
} from './page.actions';

@Injectable()
export class PageEffects {
  constructor(
    protected actions$: Actions,
    protected gastosService: GastosService,
  ) {}

  loadTableData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        GastosPageActionsTypes.GastosPageRequest,
        GastosPageActionsTypes.ChangePageOrder,
        GastosPageActionsTypes.GastosChangePage,
      ),
      switchMap(() => this.searchTableData()),
    );
  });

  private searchTableData() {
    return this.gastosService.paginate().pipe(
      map(
        (resp: any) =>
          new GastosPageRequestSuccess({
            data: resp.data,
            recordsFiltered: resp.recordsFiltered,
          }),
      ),
      catchError(error => of(new GastosPageRequestFail(error))),
    );
  }
}
