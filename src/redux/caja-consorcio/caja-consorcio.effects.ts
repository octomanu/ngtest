import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import * as ccActions from './caja-consorcio.actions';
import { of } from 'rxjs';
import { CajaConsorcioService } from '@core/http/caja-consorcio/caja-consorcio.service';

@Injectable()
export class CajaConsorcioEffects {
  constructor(
    public actions$: Actions,
    public cajaConsorcioService: CajaConsorcioService,
  ) {}

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ccActions.LOAD_CAJA_CONSORCIO,
        ccActions.CHANGE_ORDER,
        ccActions.CHANGE_PARAMS,
        ccActions.CHANGE_FILTER,
      ),
      mergeMap(() => this.searchData()),
    );
  });

  loadTotals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ccActions.LOAD_CAJA_CONSORCIO,
        ccActions.CHANGE_ORDER,
        ccActions.CHANGE_PARAMS,
        ccActions.CHANGE_FILTER,
      ),
      mergeMap(() => this.searchTotales()),
    );
  });

  searchTotales() {
    return this.cajaConsorcioService.saldos().pipe(
      map((resp: any) => {
        return new ccActions.LoadSaldosSuccessAction(resp.data);
      }),
    );
  }

  searchData() {
    return this.cajaConsorcioService.paginate().pipe(
      map(
        (resp: any) =>
          new ccActions.LoadCajaConsorcioSuccessAction(
            resp.data,
            resp.recordsFiltered,
          ),
      ),
      catchError(error => of(new ccActions.LoadCajaConsorcioFailAction(error))),
    );
  }
}
