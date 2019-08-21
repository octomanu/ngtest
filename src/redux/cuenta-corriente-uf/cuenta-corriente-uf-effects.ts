import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromCCU from 'redux/cuenta-corriente-uf/cuenta-corriente-uf-actions';
import { of } from 'rxjs';
import { CuentaCorrienteUfService } from '@core/http/cuenta-corriente-uf/cuenta-corriente-uf.service';

@Injectable()
export class CuentaCorrienteUfEffects {
  constructor(
    public actions$: Actions,
    public cuentaCorrienteUfService: CuentaCorrienteUfService,
  ) {}

  loadServicios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        fromCCU.LOAD_CUENTA_CORRIENTE_UF,
        fromCCU.CHANGE_ORDER,
        fromCCU.CHANGE_PARAMS,
        fromCCU.CHANGE_FILTER,
        fromCCU.CHANGE_UF,
      ),
      switchMap(() => this.searchData()),
    );
  });

  searchData() {
    return this.cuentaCorrienteUfService.paginate().pipe(
      map(
        (resp: any) =>
          new fromCCU.LoadCuentaCorrienteUfSuccessAction(
            resp.data,
            resp.recordsFiltered,
          ),
      ),
      catchError(error =>
        of(new fromCCU.LoadCuentaCorrienteUfFailAction(error)),
      ),
    );
  }
}
