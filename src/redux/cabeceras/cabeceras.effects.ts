import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  CabecerasPageActionsTypes,
  CabecerasPageRequestSuccess,
  CabecerasPageRequestFail,
} from './page/page.actions';
import { CabecerasService } from '@core/http/cabeceras/cabeceras.service';
import { of } from 'rxjs';

@Injectable()
export class CabecerasEffects {
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
      switchMap(() => this.searchTableData()),
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
