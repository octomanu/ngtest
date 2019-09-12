import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { EditFormEffectsHelper } from './edit-form-effects.helper';
import {
  EditFormActionsTypes,
  CabecerasEditRequestSuccess,
  CabecerasUpdateRequest,
  CabecerasEditRequestFail,
  CabecerasUpdateRequestSuccess,
  CabecerasUpdateRequestFail,
} from './edit-form.actions';
import { CabecerasPageRequest } from '../page/page.actions';
@Injectable()
export class EditFormEffects {
  constructor(
    protected actions$: Actions,
    private effectsHelper: EditFormEffectsHelper,
  ) {}

  editRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditFormActionsTypes.CabecerasEditRequest),
      tap(() => {
        this.effectsHelper
          .openEditForm()
          .pipe(first())
          .subscribe();
      }),
      mergeMap(() =>
        this.effectsHelper.searchFormData().pipe(
          map(data => new CabecerasEditRequestSuccess({ data })),
          catchError(error => of(new CabecerasEditRequestFail({ error }))),
        ),
      ),
    ),
  );

  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditFormActionsTypes.CabecerasUpdateRequest),
      mergeMap((action: CabecerasUpdateRequest) =>
        this.effectsHelper.updateData(action.payload.data).pipe(
          map(() => new CabecerasUpdateRequestSuccess()),
          catchError(error => of(new CabecerasUpdateRequestFail({ error }))),
        ),
      ),
      mergeMap(responseAction => [responseAction, new CabecerasPageRequest()]),
    ),
  );
}
