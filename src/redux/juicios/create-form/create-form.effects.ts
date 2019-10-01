import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, catchError, mergeMap, first } from 'rxjs/operators';
import { CreateFormEffectsHelper } from './create-form-effects.helper';
import { CreateFormActionTypes, SaveRequest } from './create-form.actions';
import { of } from 'rxjs';
import * as juiciosAction from './create-form.actions';
import { JuiciosPageRequest } from '../page/page.actions';

@Injectable()
export class CreateFormEffects {
  constructor(
    protected actions$: Actions,
    private effectsHelper: CreateFormEffectsHelper,
  ) {}

  open$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateFormActionTypes.OpenCreateForm),
        tap(() =>
          this.effectsHelper
            .openCreateForm()
            .pipe(first())
            .subscribe(),
        ),
      ),
    { dispatch: false },
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateFormActionTypes.SaveRequest),
      mergeMap((action: SaveRequest) =>
        this.effectsHelper.saveData(action.payload.data).pipe(
          map(
            () =>
              new juiciosAction.SaveRequestSuccess({
                data: action.payload.data,
              }),
          ),
          catchError(error =>
            of(new juiciosAction.SaveRequestFail({ error })),
          ),
        ),
      ),
      mergeMap(responseAction => [responseAction, new JuiciosPageRequest()]),
    ),
  );
}
