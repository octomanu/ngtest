import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { EditFormEffectsHelper } from './edit-form-effects.helper';
import {
  EditFormActionsTypes,
  CategoriasEditRequestSuccess,
  CategoriasUpdateRequest,
  CategoriasEditRequestFail,
  CategoriasUpdateRequestSuccess,
  CategoriasUpdateRequestFail,
} from './edit-form.actions';
import { CategoriasPageRequest } from '../page/page.actions';
@Injectable()
export class EditFormEffects {
  constructor(
    protected actions$: Actions,
    private effectsHelper: EditFormEffectsHelper,
  ) {}

  editRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditFormActionsTypes.CategoriasEditRequest),
      tap(() => {
        this.effectsHelper
          .openEditForm()
          .pipe(first())
          .subscribe();
      }),
      mergeMap(() =>
        this.effectsHelper.searchFormData().pipe(
          map(data => new CategoriasEditRequestSuccess({ data })),
          catchError(error => of(new CategoriasEditRequestFail({ error }))),
        ),
      ),
    ),
  );

  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EditFormActionsTypes.CategoriasUpdateRequest),
      mergeMap((action: CategoriasUpdateRequest) =>
        this.effectsHelper.updateData(action.payload.data).pipe(
          map(() => new CategoriasUpdateRequestSuccess()),
          catchError(error => of(new CategoriasUpdateRequestFail({ error }))),
        ),
      ),
      mergeMap(responseAction => [responseAction, new CategoriasPageRequest()]),
    ),
  );
}
