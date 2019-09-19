import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { DueActionsTypes, DueSaveRequestSuccess } from './dues.actions';

@Injectable()
export class GastosEffects {
  constructor(protected actions$: Actions) {}

  open$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DueActionsTypes.DueSaveRequest),
      mergeMap(action => [new DueSaveRequestSuccess()]),
    ),
  );
}
