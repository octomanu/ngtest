import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { CabecerasEffectsHelper } from './cabeceras-effects.helper';
import { CabecerasPageActionsTypes } from './page/page.actions';
import { FilterActionsTypes } from './filter-form/filter-form.actions';

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
        CabecerasPageActionsTypes.CabecerasChangePage,
      ),
      switchMap(() => this.effectsHelper.searchTableData()),
    );
  });
}
