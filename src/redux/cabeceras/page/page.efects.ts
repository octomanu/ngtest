import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import {
  CabecerasPageActionsTypes,
  CabecerasPageRequestSuccess,
  CabecerasPageRequestFail,
} from './page.actions';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { of } from 'rxjs';

@Injectable()
export class PageEffects {
  constructor(
    protected actions$: Actions,
    protected cabecerasService: CabecerasService,
  ) {}

  loadTableData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CabecerasPageActionsTypes.CabecerasPageRequest,
        CabecerasPageActionsTypes.ChangePageOrder,
        CabecerasPageActionsTypes.CabecerasChangePage,
      ),
      mergeMap(() => this.searchTableData()),
    );
  });

  private searchTableData() {
    return this.cabecerasService.paginate().pipe(
      map(
        (resp: any) =>
          new CabecerasPageRequestSuccess({
            data: resp.data,
            recordsFiltered: resp.recordsFiltered,
          }),
      ),
      catchError(error => of(new CabecerasPageRequestFail(error))),
    );
  }
}
