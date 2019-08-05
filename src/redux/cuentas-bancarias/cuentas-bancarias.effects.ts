import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as cbActions from './cuentas-bancarias.actions';
import { of } from 'rxjs';
import { CuentasBancariasService } from '@core/http/cuentas-bancarias/cuentas-bancarias.service';

@Injectable()
export class CuentasBancariasEffects {
  constructor(
    public actions$: Actions,
    public cuentasBancariasService: CuentasBancariasService,
  ) {}

  loadServicios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        cbActions.LOAD_CUENTAS_BANCARIAS,
        cbActions.CHANGE_ORDER,
        cbActions.CHANGE_PARAMS,
        cbActions.CHANGE_FILTER,
      ),
      switchMap(() => this.searchData()),
    );
  });

  deleteServicio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cbActions.DELETE_CUENTAS_BANCARIAS),
      switchMap((action: cbActions.DeleteCuentasBancariasAction) => {
        return this.cuentasBancariasService
          .delete(action.id)
          .pipe(map(resp => new cbActions.LoadCuentasBancariasAction()));
      }),
    );
  });
  searchData() {
    return this.cuentasBancariasService.paginate().pipe(
      map(
        (resp: any) =>
          new cbActions.LoadCuentasBancariasSuccessAction(
            resp.data,
            resp.recordsFiltered,
          ),
      ),
      catchError(error =>
        of(new cbActions.LoadCuentasBancariasFailAction(error)),
      ),
    );
  }
}
