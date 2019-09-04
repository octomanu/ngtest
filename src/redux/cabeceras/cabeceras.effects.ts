import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { CabecerasEffectsHelper } from './cabeceras-effects.helper';
import { CabecerasPageActionsTypes } from './page/page.actions';
import { CabecerasFilterTypes } from './filter-form/filter-form.actions';

@Injectable()
export class CabecerasEffects {
  constructor(
    protected actions$: Actions,
    private effectsHelper: CabecerasEffectsHelper,
  ) {}

  loadTableData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CabecerasPageActionsTypes.CabecerasPageRequest,
        CabecerasPageActionsTypes.ChangePageOrder,
      ),
      switchMap(() => this.effectsHelper.searchTableData()),
    );
  });

  filterForm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CabecerasFilterTypes.OpenFilterForm),
        tap(() => {
          this.effectsHelper.openFilterForm();
        }),
      ),
    { dispatch: false },
  );
}
