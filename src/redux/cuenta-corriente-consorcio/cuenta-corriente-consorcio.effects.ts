import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromCCC from './cuenta-corriente-consorcio.actions';
import { of } from 'rxjs';
import { CuentaCorrienteConsorcioService } from '@core/http/cuenta-corriente-consorcio/cuenta-corriente-consorcio.service';

@Injectable()
export class CuentaCorrienteConsorcioEffects {
  constructor(
    public actions$: Actions,
    public cuentaCorrienteConsorcio: CuentaCorrienteConsorcioService,
  ) {}

  loadServicios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        fromCCC.LOAD_CUENTA_CORRIENTE_CONSORCIO,
        fromCCC.CHANGE_ORDER,
        fromCCC.CHANGE_PARAMS,
        fromCCC.CHANGE_FILTER,
        fromCCC.CHANGE_CONSORCIO,
      ),
      switchMap(() => this.searchData()),
    );
  });

  searchData() {
    return this.cuentaCorrienteConsorcio.paginate().pipe(
      map(
        (resp: any) =>
          new fromCCC.LoadCuentaCorrienteConsorcioSuccessAction(
            resp.data,
            resp.recordsFiltered,
          ),
      ),
      catchError(error =>
        of(new fromCCC.LoadCuentaCorrienteConsorcioFailAction(error)),
      ),
    );
  }
}
