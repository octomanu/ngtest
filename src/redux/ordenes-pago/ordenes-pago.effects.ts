import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as ordenesPagoActions from './ordenes-pago.actions';
import { of } from 'rxjs';
import { OrdenesPagoService } from '@core/http/ordenes_pago/ordenes-pago.service';

@Injectable()
export class OrdenesPagoEffects {
  constructor(
    public actions$: Actions,
    public ordenesPagoService: OrdenesPagoService,
  ) {}

  loadServicios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ordenesPagoActions.LOAD_ORDENES_PAGOS,
        ordenesPagoActions.CHANGE_ORDER,
        ordenesPagoActions.CHANGE_PARAMS,
        ordenesPagoActions.CHANGE_FILTER,
      ),
      switchMap(() => this.searchData()),
    );
  });

  deleteServicio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ordenesPagoActions.DELETE_ORDENES_PAGOS),
      switchMap((action: ordenesPagoActions.DeleteOrdenesPagosAction) => {
        return this.ordenesPagoService
          .delete(action.id)
          .pipe(map(resp => new ordenesPagoActions.LoadOrdenesPagosAction()));
      }),
    );
  });
  searchData() {
    return this.ordenesPagoService.paginate().pipe(
      map(
        (resp: any) =>
          new ordenesPagoActions.LoadOrdenesPagosSuccessAction(
            resp.data,
            resp.recordsFiltered,
          ),
      ),
      catchError(error =>
        of(new ordenesPagoActions.LoadOrdenesPagosFailAction(error)),
      ),
    );
  }
}
