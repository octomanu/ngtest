import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SueldosService } from '@core/http/sueldos/sueldos.service';
import * as sueldosActions from 'redux/sueldos/sueldos.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SueldosEffects {
  constructor(
    public actions$: Actions,
    public sueldoServices: SueldosService,
  ) {}

  loadSueldos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        sueldosActions.LOAD_SUELDOS,
        sueldosActions.CHANGE_EMPLEADO,
        sueldosActions.CHANGE_ORDER,
        sueldosActions.CHANGE_PARAMS,
        sueldosActions.CHANGE_FILTER,
      ),
      switchMap(() => this.searchData()),
    );
  });

  public searchData() {
    return this.sueldoServices.paginate().pipe(
      map(
        (resp: any) =>
          new sueldosActions.LoadSueldosSuccessAction(
            resp.data,
            resp.recordsFiltered,
          ),
      ),
      catchError(error => of(new sueldosActions.LoadSueldosFailAction(error))),
    );
  }
}
