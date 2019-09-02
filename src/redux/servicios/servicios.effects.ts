import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  filter,
} from 'rxjs/operators';
import { ServiciosService } from '@core/http/servicios/servicios.service';
import * as serviciosActions from './servicios.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'redux/app.reducer';
import { selectPaginatorData } from './servicios.selectors';

@Injectable()
export class ServiciosEffects {
  constructor(
    protected actions$: Actions,
    protected serviciosService: ServiciosService,
    protected store: Store<AppState>,
  ) {}

  initTable$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(serviciosActions.INIT_TABLE),
      withLatestFrom(this.store.select(selectPaginatorData)),
      filter(([action, data]) => !(data.length > 0)),
      switchMap(() => this.searchData()),
    );
  });

  loadServicios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        serviciosActions.LOAD_SERVICIOS,
        serviciosActions.CHANGE_ORDER,
        serviciosActions.CHANGE_PARAMS,
        serviciosActions.CHANGE_FILTER,
        serviciosActions.CHANGE_PAGE,
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
