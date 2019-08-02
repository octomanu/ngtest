import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ServiciosService } from '@core/http/servicios/servicios.service';
import * as serviciosActions from './servicios.actions';
import { of } from 'rxjs';

@Injectable()
export class ServiciosEffects {
  constructor(
    public actions$: Actions,
    public serviciosService: ServiciosService,
  ) {}

  loadServicios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        serviciosActions.LOAD_SERVICIOS,
        serviciosActions.CHANGE_ORDER,
        serviciosActions.CHANGE_PARAMS,
        serviciosActions.CHANGE_FILTER,
      ),
      switchMap(() => this.searchData()),
    );
  });

  deleteServicio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(serviciosActions.DELETE_SERVICIO),
      switchMap((action: serviciosActions.DeleteServicioAction) => {
        return this.deleteServicio(action.id);
      }),
    );
  });

  deleteServicio(id: number) {
    return this.serviciosService
      .delete(id)
      .pipe(map(resp => new serviciosActions.LoadServiciosAction()));
  }

  searchData() {
    return this.serviciosService.paginateRedux().pipe(
      map(
        (resp: any) =>
          new serviciosActions.LoadServiciosSuccessAction(
            resp.data,
            resp.recordsFiltered,
          ),
      ),
      catchError(error =>
        of(new serviciosActions.LoadServiciosFailAction(error)),
      ),
    );
  }
}
