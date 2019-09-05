import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { FilterActionsTypes } from './filter-form.actions';
import { FilterFormEffectsHelper } from './filter-form-effects.helpet';
import { CabecerasPageRequest } from '../page/page.actions';

@Injectable()
export class FilterFormEffects {
  constructor(
    protected actions$: Actions,
    private effectsHelper: FilterFormEffectsHelper,
  ) {}

  filterForm$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FilterActionsTypes.OpenFilterForm),
        tap(() => {
          this.effectsHelper.openFilterForm();
        }),
      ),
    { dispatch: false },
  );

  filterIt$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FilterActionsTypes.FilterRequest),
        tap(() =>
          this.effectsHelper.store.dispatch(new CabecerasPageRequest()),
        ),
      ),
    { dispatch: false },
  );
}
