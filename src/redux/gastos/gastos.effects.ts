import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import {
  GastosActionsTypes,
  GastosDueSaveRequestSuccess,
} from './gastos.actions';

@Injectable()
export class GastosEffects {
  constructor(protected actions$: Actions) {}

  open$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GastosActionsTypes.GastosDueSaveRequest),
      mergeMap(action => [new GastosDueSaveRequestSuccess()]),
    ),
  );
}
