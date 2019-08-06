import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as gdActions from './gastos-descripciones.actions';
import { of } from 'rxjs';
import { GastosDescripcionesService } from '@core/http/gastos-descripciones/gastos-descripciones.service';

@Injectable()
export class GastosDescripcionesEffects {
  constructor(
    public actions$: Actions,
    public gastosDescripcionesService: GastosDescripcionesService,
  ) {}

  loadServicios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        gdActions.LOAD_GASTOS_DESCRIPCIONES,
        gdActions.CHANGE_ORDER,
        gdActions.CHANGE_PARAMS,
        gdActions.CHANGE_FILTER,
      ),
      switchMap(() => this.searchData()),
    );
  });

  deleteServicio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(gdActions.DELETE_GASTOS_DESCRIPCIONES),
      switchMap((action: gdActions.DeleteGastosDescripcionesAction) => {
        return this.gastosDescripcionesService
          .delete(action.id)
          .pipe(map(resp => new gdActions.LoadGastosDescripcionesAction()));
      }),
    );
  });
  searchData() {
    return this.gastosDescripcionesService.paginate().pipe(
      map(
        (resp: any) =>
          new gdActions.LoadGastosDescripcionesSuccessAction(
            resp.data,
            resp.recordsFiltered,
          ),
      ),
      catchError(error =>
        of(new gdActions.LoadGastosDescripcionesFailAction(error)),
      ),
    );
  }
}
