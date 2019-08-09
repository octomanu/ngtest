import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as chequerasActions from './chequeras.actions';
import { of } from 'rxjs';
import { ChequerasService } from '@core/http/chequeras/chequeras.service';

@Injectable()
export class ChequerasEffects {
  constructor(
    public actions$: Actions,
    public chequerasService: ChequerasService,
  ) {}

  loadServicios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        chequerasActions.LOAD_CHEQUERAS,
        chequerasActions.CHANGE_ORDER,
        chequerasActions.CHANGE_PARAMS,
        chequerasActions.CHANGE_FILTER,
      ),
      switchMap(() => this.searchData()),
    );
  });

  deleteServicio$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(chequerasActions.DELETE_CHEQUERAS),
      switchMap((action: chequerasActions.DeleteChequerasAction) => {
        return this.deleteServicio(action.id);
      }),
    );
  });

  deleteServicio(id: number) {
    return this.chequerasService
      .delete(id)
      .pipe(map(resp => new chequerasActions.LoadChequerasAction()));
  }

  searchData() {
    return this.chequerasService.paginate().pipe(
      map(
        (resp: any) =>
          new chequerasActions.LoadChequerasSuccessAction(
            resp.data,
            resp.recordsFiltered,
          ),
      ),
      catchError(error =>
        of(new chequerasActions.LoadChequerasFailAction(error)),
      ),
    );
  }
}
