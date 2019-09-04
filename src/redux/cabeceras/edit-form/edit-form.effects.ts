import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  switchMap,
  tap,
  mergeMap,
  map,
  withLatestFrom,
  catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { EditFormEffectsHelper } from './edit-form-effects.helper';
import {
  EditFormActionsTypes,
  CabecerasEditRequestSuccess,
  CabecerasUpdateRequest,
  CabecerasEditRequestFail,
} from './edit-form.actions';
import { editFormData } from '../cabeceras.selectors';

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
      ofType(EditFormActionsTypes.CabecerasUpdateRequest),
      switchMap((action: CabecerasUpdateRequest) =>
        this.effectsHelper.updateData(action.payload.data),
      ),
    ),
  );
}
