import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { EditFormEffectsHelper } from './edit-form-effects.helper';
import {
  EditFormActionsTypes,
  JuiciosEditRequestSuccess,
  JuiciosUpdateRequest,
  JuiciosEditRequestFail,
  JuiciosUpdateRequestSuccess,
  JuiciosUpdateRequestFail,
} from './edit-form.actions';
import { JuiciosPageRequest } from '../page/page.actions';
@Injectable()
export class EditFormEffects {
  constructor(
    protected actions$: Actions,
    private effectsHelper: EditFormEffectsHelper,
  ) {}

  editRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditFormActionsTypes.JuiciosEditRequest),
      tap(() => {
        this.effectsHelper
          .openEditForm()
          .pipe(first())
          .subscribe();
      }),
      mergeMap(() =>
        this.effectsHelper.searchFormData().pipe(
          map(data => new JuiciosEditRequestSuccess({ data })),
          catchError(error => of(new JuiciosEditRequestFail({ error }))),
        ),
      ),
    ),
  );

  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditFormActionsTypes.JuiciosUpdateRequest),
      mergeMap((action: JuiciosUpdateRequest) =>
        this.effectsHelper.updateData(action.payload.data).pipe(
          map(() => new JuiciosUpdateRequestSuccess()),
          catchError(error => of(new JuiciosUpdateRequestFail({ error }))),
        ),
      ),
      mergeMap(responseAction => [responseAction, new JuiciosPageRequest()]),
    ),
  );
}
