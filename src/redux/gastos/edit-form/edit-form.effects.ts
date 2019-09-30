import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { EditFormEffectsHelper } from './edit-form-effects.helper';
import {
  EditFormActionsTypes,
  GastosEditRequestSuccess,
  GastosUpdateRequest,
  GastosEditRequestFail,
  GastosUpdateRequestSuccess,
  GastosUpdateRequestFail,
} from './edit-form.actions';
import { GastosPageRequest } from '../page/page.actions';
@Injectable()
export class EditFormEffects {
  constructor(
    protected actions$: Actions,
    private effectsHelper: EditFormEffectsHelper,
  ) {}

  editRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditFormActionsTypes.GastosEditRequest),
      tap(() => {
        this.effectsHelper
          .openEditForm()
          .pipe(first())
          .subscribe();
      }),
      mergeMap(() =>
        this.effectsHelper.searchFormData().pipe(
          map(data => new GastosEditRequestSuccess({ data })),
          catchError(error => of(new GastosEditRequestFail({ error }))),
        ),
      ),
    ),
  );

  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditFormActionsTypes.GastosUpdateRequest),
      mergeMap((action: GastosUpdateRequest) =>
        this.effectsHelper.updateData(action.payload.data).pipe(
          map(() => new GastosUpdateRequestSuccess()),
          catchError(error => of(new GastosUpdateRequestFail({ error }))),
        ),
      ),
      mergeMap(responseAction => [responseAction, new GastosPageRequest()]),
    ),
  );
}
