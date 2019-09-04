import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CabecerasActionsTypes,
  CabecerasUpdateRequest,
  CabecerasEditRequestSuccess,
  CabecerasEditRequestFail,
} from './cabeceras.actions';
import {
  switchMap,
  tap,
  mergeMap,
  map,
  withLatestFrom,
  catchError,
} from 'rxjs/operators';
import { CabecerasEffectsHelper } from './cabeceras-effects.helper';
import { editFormData } from './cabeceras.selectors';
import { of } from 'rxjs';

@Injectable()
export class CabecerasEffects {
  constructor(
    protected actions$: Actions,
    private effectsHelper: CabecerasEffectsHelper,
  ) {}

  loadTableData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CabecerasActionsTypes.CabecerasPageRequest,
        CabecerasActionsTypes.ChangePageOrder,
      ),
      switchMap(() => this.effectsHelper.searchTableData()),
    );
  });

  editRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CabecerasActionsTypes.CabecerasEditRequest),
      tap(() => {
        this.effectsHelper.openEditForm();
      }),
      withLatestFrom(this.effectsHelper.store.select(editFormData)),
      mergeMap(([action, data]) =>
        data ? of(data) : this.effectsHelper.searchFormData(),
      ),
      map(data => new CabecerasEditRequestSuccess({ data })),
      catchError(error => of(new CabecerasEditRequestFail({ error }))),
    ),
  );

  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CabecerasActionsTypes.CabecerasUpdateRequest),
      switchMap((action: CabecerasUpdateRequest) =>
        this.effectsHelper.updateData(action.payload.data),
      ),
    ),
  );

  filterForm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CabecerasActionsTypes.OpenFilterForm),
        tap(() => {
          this.effectsHelper.openFilterForm();
        }),
      ),
    { dispatch: false },
  );
}
