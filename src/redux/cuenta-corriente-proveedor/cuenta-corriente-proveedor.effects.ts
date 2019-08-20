import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromCCP from './cuenta-corriente-proveedor.actions';
import { of } from 'rxjs';
import { CuentaCorrienteProveedorService } from '@core/http/cuenta-corriente-proveedor/cuenta-corriente-proveedor.service';

@Injectable()
export class CuentaCorrienteProveedorEffects {
  constructor(
    public actions$: Actions,
    public cuentaCorrienteProveedor: CuentaCorrienteProveedorService,
  ) {}

  loadServicios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        fromCCP.LOAD_CUENTA_CORRIENTE_PROVEEDOR,
        fromCCP.CHANGE_ORDER,
        fromCCP.CHANGE_PARAMS,
        fromCCP.CHANGE_FILTER,
        fromCCP.CHANGE_PROVEEDOR,
      ),
      switchMap(() => this.searchData()),
    );
  });

  searchData() {
    return this.cuentaCorrienteProveedor.paginate().pipe(
      map(
        (resp: any) =>
          new fromCCP.LoadCuentaCorrienteProveedorSuccessAction(
            resp.data,
            resp.recordsFiltered,
          ),
      ),
      catchError(error =>
        of(new fromCCP.LoadCuentaCorrienteProveedorFailAction(error)),
      ),
    );
  }
}
